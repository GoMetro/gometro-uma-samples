import actionTypes from "../actionTypes";

export const authenticate = (options) =>
    ({ type: actionTypes.authentication.authenticate, options });

export const authenticating = () =>
    ({ type: actionTypes.authentication.authenticating });

export const authenticationSucceeded = (userProfile) =>
    ({ type: actionTypes.authentication.authenticationSucceeded, userProfile });

export const authenticationFailed = (errorMessage) =>
    ({ type: actionTypes.authentication.authenticationFailed, errorMessage });

export const completeAuthentication = (url) =>
    ({ type: actionTypes.authentication.completeAuthentication, url });

export const completingAuthentication = () =>
    ({ type: actionTypes.authentication.completingAuthentication });

export const initialise = () =>
    ({ type: actionTypes.authentication.initialise});

export const initialising = () =>
    ({ type: actionTypes.authentication.initialising });

export const initialisationSucceeded = () =>
    ({ type: actionTypes.authentication.initialisationSucceeded });

export const initialisationFailed = () =>
    ({ type: actionTypes.authentication.initialisationFailed });

export const logout = () =>
    ({ type: actionTypes.authentication.logout });

export const loggingOut = () =>
    ({ type: actionTypes.authentication.loggingOut });

export const logoutSucceeded = () =>
    ({ type: actionTypes.authentication.logoutSucceeded });

export const refreshToken = () =>
    ({ type: actionTypes.authentication.refreshToken });

/**
 * Export Actions
 */
export const actions = {
    authenticate,
    authenticating,
    authenticationSucceeded,
    authenticationFailed,
    completeAuthentication,
    completingAuthentication,
    initialise,
    initialising,
    initialisationSucceeded,
    initialisationFailed,
    logout,
    loggingOut,
    logoutSucceeded,
    refreshToken,
}
