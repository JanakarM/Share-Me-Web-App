import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'logon',
    initialState: {
        user: undefined,
        checkingLoginStatus: true,
        savedFeedIds:[
        ]
    },
    reducers: {
        login: (state, { payload }) => {
        },
        setLoggedInUser: (state, { payload }) => {
            return {...state, user: payload, checkingLoginStatus: false}
        },
        logout: (state) => {
            return {...state, user: undefined}
        },
        getLoggedInUser: (state) => {
            return {...state, checkingLoginStatus: true}
        },
        setSavedFeedIds: (state, { payload }) => {
            return {...state, savedFeedIds: payload}
        }
    }
});
export const {login, logout, setLoggedInUser, getLoggedInUser, setSavedFeedIds} = slice.actions;
export default slice.reducer;