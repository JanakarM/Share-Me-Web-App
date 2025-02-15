import { configureStore } from '@reduxjs/toolkit';
import { LogonReducer, HomeReducer} from '../reducers';
import createSagaMiddleWare from 'redux-saga'
import ApiService from '../../middlewares/sagas/api-service'
import LoggerService from '../../middlewares/sagas/logger'
import { createPost } from '../reducers/home-reducer';

const sagaMiddleWare= createSagaMiddleWare()
const logger= createSagaMiddleWare()
const store = configureStore({
    reducer: {
        logon: LogonReducer,
        home: HomeReducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:{
            ignoreActions: [createPost]
        }}).concat(sagaMiddleWare).concat(logger)
});

// store.subscribe(()=>{
//     console.log(store.getState());
// })
sagaMiddleWare.run(ApiService)
logger.run(LoggerService)

export default store;