import { Linking } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import qs from "querystring";

import { decodeToken } from "../utils/jwt";
import { createUUID } from "../utils/uuid";

const baseUrl = "https://identity.staging.gometroapp.com/auth/realms/platform";
const authorizeUrl = `${ baseUrl }/protocol/openid-connect/auth`;
const tokenUrl = `${ baseUrl }/protocol/openid-connect/token`;
const logoutUrl = `${ baseUrl }/protocol/openid-connect/logout`;
const redirectUrl = "gometrouma://sso";

const clientId = "gometro-uma-samples-reactnative";

/**
 * Logout
 */
const logout = () => {
    return Promise
        .all([
            AsyncStorage.removeItem("kc-callback"),
            AsyncStorage.removeItem("kc-refresh-token"),
            AsyncStorage.removeItem("kc-token")
        ])
        .then(() => {
            const request = { redirect_uri: redirectUrl };
            return Linking.openURL(`${ logoutUrl }?${ qs.stringify(request) }`)
        })
};

/**
 * Get Token
 *
 * @param request
 */
const getToken = (request) => {
    const options = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

    return axios
        .post(tokenUrl, qs.stringify(request), options)
        .then((response) => {
            const data = response.data;

            const refreshToken = data.refresh_token;
            const token = data.access_token;

            const decodedToken = decodeToken(token);

            return {
                realmAccess: decodedToken.realm_access,
                resourceAccess: decodedToken.resource_access,
                token: token,
                refreshToken: refreshToken,
                user: {
                    id: decodedToken.sub,
                    email: decodedToken.email,
                    firstName: decodedToken.given_name,
                    lastName: decodedToken.family_name,
                },
            }
        })
        .then((profile) => {
            return Promise
                .all([
                    AsyncStorage.setItem("kc-refresh-token", profile.refreshToken),
                    AsyncStorage.setItem("kc-token", profile.token)
                ])
                .then(() => profile);
        });
};

/**
 * Update Token
 *
 * @param secondsLeft
 *
 * @returns {Promise<*>|Promise}
 */
const updateToken = (secondsLeft) => {

    return AsyncStorage
        .getItem("kc-token")
        .then(token => {
            if (token) {
                const decodedToken = decodeToken(token);

                if (decodedToken.exp < (Date.now + secondsLeft * 1000)) {
                    return Promise.resolve(token);
                }
            }

            return refreshToken()
                .then(userProfile => userProfile.token);
        });
};

/**
 * Refresh Token
 *
 * @returns {Promise|Promise<{realmAccess: *, user: {firstName: *, lastName: *, email: *}, resourceAccess: *, token: *}>}
 */
const refreshToken = () => {

    return AsyncStorage
        .getItem("kc-refresh-token")
        .then(refreshToken => {
            if (!refreshToken) {
                return Promise.reject("Could not find refreshToken in Async Storage!")
            }

            return getToken({
                client_id: clientId,
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            });
        });
};

/**
 * Authenticate with Provider
 *
 * @param loginOptions
 */
const authenticateWithProvider = (loginOptions) => {

    const nonce = createUUID();
    const state = createUUID();

    const request = {
        client_id: clientId,
        kc_idp_hint: loginOptions.idpHint,
        redirect_uri: redirectUrl,
        response_type: "code",
        nonce: nonce,
        scope: "openid email profile",
        state: state
    };

    return AsyncStorage
        .setItem("kc-callback", JSON.stringify({ state, redirectUrl }))
        .then(() =>
            Linking
                .openURL(`${ authorizeUrl }?${ qs.stringify(request) }`)
        )
        .catch((error) => {
            console.error(error);
        });
};

/**
 * Complete Provider Authentication
 *
 * @returns {Promise|Promise<{realmAccess: *, user: {firstName: *, lastName: *, email: *}, resourceAccess: *, token: *}>}
 */
const completeProviderAuthentication = (url) => {

    const tokens = url.split("?");
    const queryString = tokens.length === 1 ? tokens[0] : tokens[1];
    const response = qs.parse(queryString);
    const state = response.state;

    return AsyncStorage
        .getItem("kc-callback")
        .then(callbackJson => {
            if (!callbackJson) {
                return Promise.reject("No callback data available!");
            }

            const callback = JSON.parse(callbackJson);
            if (callback.state !== state) {
                return Promise.reject("Response state does not match request!");
            }

            return getToken({
                code: response.code,
                grant_type: "authorization_code",
                redirect_uri: redirectUrl,
                client_id: clientId
            });
        });
};

export default {
    authenticateWithProvider,
    completeProviderAuthentication,
    logout,
    refreshToken,
    updateToken
};
