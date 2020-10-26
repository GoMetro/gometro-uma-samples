import { call, cancel, fork, put, take } from "redux-saga/effects";

import keycloak from "../../config/keycloak";
import actions from "../actions";
import actionTypes from "../actionTypes";

/**
 * Initialise Saga
 */
export function* initialiseSaga() {
    yield put(actions.authentication.initialising());

    try {
        const userProfile = yield keycloak.refreshToken();
        yield put(actions.authentication.authenticationSucceeded(userProfile));
    } catch (error) {
        console.error(error);
    }

    yield put(actions.authentication.initialisationSucceeded());
}

/**
 * Authenticate Saga
 */
export function* authenticateSaga(action) {
    yield put(actions.authentication.authenticating());

    const loginOptions = action.options;

    if (loginOptions.idpHint) {
        yield keycloak.authenticateWithProvider(loginOptions);
        return;
    }

    try {
        const userProfile = yield keycloak.authenticateWithCredentials(loginOptions);
        yield put(actions.authentication.authenticationSucceeded(userProfile));
    } catch (error) {
        yield put(actions.authentication.authenticationFailed(error.message));
    }
}

/**
 * Complete Authentication Saga
 */
export function* completeAuthenticationSaga(action) {
    try {
        const userProfile = yield keycloak.completeProviderAuthentication(action.url);
        yield put(actions.authentication.authenticationSucceeded(userProfile));
    } catch (error) {
        yield put(actions.authentication.authenticationFailed(error.message));
    }
}

/**
 * Logout Saga
 */
export function* logoutSaga() {
    yield put(actions.authentication.loggingOut());

    yield keycloak.logout();

    yield put(actions.authentication.logoutSucceeded());
}

/**
 * Refresh Token
 */
const refreshTokenDelay = ms => new Promise(resolve => setTimeout(resolve, ms))

function* refreshTokenTick() {

    while (true) {
        yield call(refreshTokenDelay, 240000);
        yield put(actions.authentication.refreshToken());
    }
}

export function* refreshTokenTimerSaga() {

    while (yield take(actionTypes.authentication.authenticationSucceeded)) {
        const backgroundSyncTask = yield fork(refreshTokenTick)
        yield take(actionTypes.authentication.logoutSucceeded)
        yield cancel(backgroundSyncTask)
    }
}

export function* refreshTokenSaga() {
    try {
        yield keycloak.refreshToken();
    } catch (error) {
        console.error(error);
        yield put(actions.authentication.logout());
    }
}
