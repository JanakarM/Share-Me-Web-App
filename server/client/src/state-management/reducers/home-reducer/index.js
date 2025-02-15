import {createSlice} from '@reduxjs/toolkit';
import { distinctUnionOfObjects } from '../../../utils';

const slice = createSlice({
    name: 'home',
    initialState: {
        toggleSidebar: false,
        searchTerm: '',
        categories: [
        ],
        feeds: [
        ],
        createPinStatus: undefined,
        userProfileLoading: false,
        pinDetailLoading: false,
        pinDetail: undefined,
        userProfile: undefined,
        feedsLoading: false,
        pageNumber: 1,
        countPerPage: 5
    },
    reducers: {
        setToggleSidebar: (state, { payload }) => {
            return {...state, toggleSidebar: payload}
        },
        setSearchTerm: (state, { payload }) => {
            return {...state, searchTerm: payload}
        },
        setFeeds: (state, { payload }) => {
            return {...state, feeds: distinctUnionOfObjects(state.feeds, payload), feedsLoading: false}
        },
        savePost: (state, { payload }) => {
            
        },
        unSavePost: (state, { payload }) => {
            
        },
        createPost: (state, { payload }) => {
            
        },
        updateFeeds: (state, { payload }) => {
            return {...state, feedsLoading: true}
        },
        setCreatePinStatus: (state, { payload }) => {
            return {...state, createPinStatus: payload}
        },
        updateCategories: (state, { payload }) => {
        },
        setCategories: (state, { payload }) => {
            return {...state, categories: payload}
        },
        deletePost: (state, { payload }) => {
        },
        getPinDetail(state, { payload }){
            return {...state, pinDetailLoading: true}
        },
        setPinDetail(state, { payload }){
            return {...state, pinDetail: payload, pinDetailLoading: false}
        },
        getUserProfile(state, { payload }){
            return {...state, userProfileLoading: true}
        },
        setUserProfile(state, { payload }){
            return {...state, userProfile: payload, userProfileLoading: false}
        },
        nextPage(state, { payload }){
            return {...state, pageNumber: state.pageNumber+1}
        }
    }
});
export const 
{ 
    setToggleSidebar, setSearchTerm, setFeeds, savePost,
    unSavePost, createPost, updateFeeds, setCreatePinStatus,
    updateCategories, setCategories, deletePost, getPinDetail, 
    setPinDetail, getUserProfile, setUserProfile, nextPage
} = slice.actions;
export default slice.reducer;