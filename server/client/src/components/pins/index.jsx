import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Navbar, Feed } from '../index'
import { setSearchTerm } from '../../state-management/reducers/home-reducer'

const Pins= ({ user })=> {
    const searchTerm= useSelector(state=> state.home.searchTerm)
    const dispatch= useDispatch();
    const updateSearchTerm=(val)=> {
        dispatch(setSearchTerm(val))
    }
    return (
        <div className='px-2 md:px-5'>
            <div className=''>
                <Navbar user={user} searchTerm={searchTerm} setSearchTerm={updateSearchTerm}/>
            </div>
            <div className='h-full'>
                <Routes>
                    <Route path='/' element={<Feed />} />
                    <Route path='/category/:categoryId' element={<Feed />} />
                </Routes>
            </div>
        </div>
    )
}

export default Pins