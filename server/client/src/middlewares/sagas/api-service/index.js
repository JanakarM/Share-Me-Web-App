import * as posts from './post'
import * as users from './user'
import { all, fork } from 'redux-saga/effects'

export default function* rootSaga(action){
    yield all([
        ...Object.values(posts),
        ...Object.values(users)
    ].map(fork))
}