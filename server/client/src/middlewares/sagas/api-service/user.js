import { call, put, takeEvery } from "redux-saga/effects";
import * as Api from '../../../api-client'
import { getUserProfile, setUserProfile } from "../../../state-management/reducers/home-reducer";
import { getLoggedInUser, login, setLoggedInUser, setSavedFeedIds } from "../../../state-management/reducers/logon-reducer";

function* loginHandler(action){
    const {data}= yield call(Api.login, action.payload)
    yield put(setLoggedInUser(data))
}
function* getLoggedInUserHandler(action){
    let { data }= yield call(Api.getLoggedInUser)
    yield put(setLoggedInUser(data));
    ({ data } = yield call(Api.getSavedPostIds))
    yield put(setSavedFeedIds(data))
}
function* getUserHandler(action){
    const { data }= yield call(Api.getUser, action.payload)
    yield put(setUserProfile(data))
}

export function* loginUserSaga(action){
    yield takeEvery([login.type], loginHandler)
}
export function* getLoggedInUserSaga(action){
    yield takeEvery([getLoggedInUser.type], getLoggedInUserHandler)
}
export function* getUserSaga(action){
    yield takeEvery([getUserProfile.type], getUserHandler)
}