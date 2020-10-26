import { fromMap } from "./utils";
import update from "immutability-helper";
import actionTypes from "../actionTypes";

const authenticationSucceeded = (state, action) =>
    update(state, {
        authenticated: { $set: true },
        authenticationFailedErrorMessage: { $set: undefined },
        realmAccess: { $set: action.userProfile.realmAccess },
        resourceAccess: { $set: action.userProfile.resourceAccess },
        user: { $set: action.userProfile.user },
    });

const authenticationFailed = (state, action) =>
    update(state, {
        authenticated: { $set: false },
        authenticationFailedErrorMessage: { $set: action.errorMessage },
        realmAccess: { $set: undefined },
        resourceAccess: { $set: undefined },
        user: { $set: undefined },
    });

const initialising = (state, action) =>
    update(state, {
        initialising: { $set: true },
        initialised: { $set: false },
        redirectPath: { $set: action.redirectPath },
        realmAccess: { $set: undefined },
        resourceAccess: { $set: undefined },
        user: { $set: undefined },
    });

const initialisationSucceeded = (state) =>
    update(state, {
        initialising: { $set: false },
        initialised: { $set: true },
        initialisationFailed: { $set: false },
    });

const initialisationFailed = (state) =>
    update(state, {
        initialising: { $set: false },
        initialised: { $set: false },
        initialisationFailed: { $set: true },
    });

const logoutSucceeded = (state) =>
    update(state, {
        authenticated: { $set: false },
        initialising: { $set: false },
        initialised: { $set: false },
        initialisationFailed: { $set: false },
        redirectPath: { $set: undefined },
        realmAccess: { $set: undefined },
        resourceAccess: { $set: undefined },
        user: { $set: undefined },
    });

const reducers = {
    [actionTypes.authentication.authenticationSucceeded]: authenticationSucceeded,
    [actionTypes.authentication.authenticationFailed]: authenticationFailed,
    [actionTypes.authentication.initialising]: initialising,
    [actionTypes.authentication.initialisationSucceeded]: initialisationSucceeded,
    [actionTypes.authentication.initialisationFailed]: initialisationFailed,
    [actionTypes.authentication.logoutSucceeded]: logoutSucceeded,
}

const initialState = {
    authenticated: false,
    authenticationFailedErrorMessage: undefined,
    initialising: false,
    initialised: false,
    initialisationFailed: false,
    redirectPath: undefined,
    realmAccess: undefined,
    resourceAccess: undefined,
    user: undefined,
};

export default fromMap(reducers, initialState);
