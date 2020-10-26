import { all, fork, takeEvery } from "redux-saga/effects";

import {
    authenticateSaga,
    completeAuthenticationSaga,
    initialiseSaga,
    logoutSaga,
    refreshTokenSaga,
    refreshTokenTimerSaga,
} from "./authentication";
import actionTypes from "../actionTypes";

function* watchAuthentication() {
    yield all([
        fork(refreshTokenTimerSaga),
        takeEvery(actionTypes.authentication.authenticate, authenticateSaga),
        takeEvery(actionTypes.authentication.completeAuthentication, completeAuthenticationSaga),
        takeEvery(actionTypes.authentication.initialise, initialiseSaga),
        takeEvery(actionTypes.authentication.logout, logoutSaga),
        takeEvery(actionTypes.authentication.refreshToken, refreshTokenSaga)
    ]);
}

const intialiseSagaMiddleware = (sagaMiddleware) => {
    sagaMiddleware.run(watchAuthentication);
}

export default intialiseSagaMiddleware;
