import { call, put, select, takeEvery } from 'redux-saga/effects'
import { savePost, setCreatePinStatus, setFeeds, updateFeeds, createPost, updateCategories, setCategories, deletePin, deletePost, getPinDetail, setPinDetail, unSavePost } from '../../../state-management/reducers/home-reducer'
import * as Api from '../../../api-client'
import { setSavedFeedIds } from '../../../state-management/reducers/logon-reducer'

//handler function starts

function* fetchPostsHandler(action){
    let { data }= yield call(Api.getAllPosts, action.payload)
    yield put(setFeeds(data));
    ({ data } = yield call(Api.getSavedPostIds))
    yield put(setSavedFeedIds(data))
}

function* fetchCategoriesHandler(action){
    const { data }= yield call(Api.getCategories)
    yield put(setCategories(data))
}

function* createPostHanlder(action){
    const { data }= yield call(Api.createPost, action.payload)
    yield put(setCreatePinStatus(data))
    const pageInfo= {
        pageNumber: yield select((state)=> state.home.pageNumber),
        countPerPage: yield select((state)=> state.home.countPerPage)
    }
    yield put(updateFeeds(pageInfo))
}

function* deletePostHanlder(action){
    yield call(Api.deletePost, action.payload)
    const { data }= yield call(Api.getAllPosts, action.payload)
    yield put(setFeeds(data))
}

function* getPostDetilHanlder(action){
    const { data }= yield call(Api.getPost, action.payload)
    yield put(setPinDetail(data))
}

function* savePostHanlder(action){
    yield call(Api.savePost, action.payload)
    const { data } = yield call(Api.getSavedPostIds)
    yield put(setSavedFeedIds(data))
}

function* removeSavedPostHanlder(action){
    yield call(Api.removeSavedPost, action.payload)
    const { data } = yield call(Api.getSavedPostIds)
    yield put(setSavedFeedIds(data))
}

//handler function ends

//watcher functions starts

export function* fetchPostsSaga(action){
    yield takeEvery([updateFeeds.type], fetchPostsHandler)
}

export function* savePostSaga(action){
    yield takeEvery([savePost.type], savePostHanlder)
}

export function* removeSavedPostSaga(action){
    yield takeEvery([unSavePost.type], removeSavedPostHanlder)
}

export function* fetchCategoriesSaga(action){
    yield takeEvery([updateCategories.type], fetchCategoriesHandler)
}

export function* createPostSaga(action){
    yield takeEvery([createPost.type], createPostHanlder)
}

export function* deletePostSaga(action){
    yield takeEvery([deletePost.type], deletePostHanlder)
}

export function* getPostDetilSaga(action){
    yield takeEvery([getPinDetail.type], getPostDetilHanlder)
}

//watcher functions ends