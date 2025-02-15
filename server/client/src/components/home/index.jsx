import React, { useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { Route, Routes, Link} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Sidebar, UserProfile, Pins, CreatePin, PinDetail } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { setToggleSidebar, updateCategories } from '../../state-management/reducers/home-reducer'

const Home= ()=> {
    const user= useSelector(state=> state.logon.user);
    const toggleSidebar= useSelector(state=> state.home.toggleSidebar);
    const scrollRef= useRef()
    const handleToggleSidebar= (val)=> {
        dispatch(setToggleSidebar(val))
    }
    useEffect(()=> {
        dispatch(updateCategories())
        scrollRef.current.scrollTo(0,0)
    }, [])
    const dispatch= useDispatch()
    return (
        <div className='flex flex-col md:flex-row bg-gray-50 h-screen transition-height duration-75 ease-out'>
            <div className='hidden md:flex flex-initial bg-gray-100'>
                <Sidebar user={user && user}/>
            </div>
            <div className='flex md:hidden'>
                <div className='flex flex-row justify-between items-center shadow-md py-5 px-2 w-full'>
                    <HiMenu fontSize={40} className='cursor-pointer' onClick={()=> handleToggleSidebar(true)}
                    />
                    <Link to='/' className='cursor-default'>
                        <img src={logo} alt="logo" className="w-28 cursor-default" />
                    </Link>
                    <Link to={`/user-profile/${user.id}`}>
                        <img src={`/file/download?fileName=${user.profilePicUrl}`} alt="user-img" className="w-12 rounded-full" />
                    </Link>
                </div>
                {(toggleSidebar && 
                    <div className='h-full w-4/5 fixed bg-gray-100 overflow-y-auto shadow-md z-10 animate-slide-in'>
                        <div className="absolute flex w-full justify-end items-center p-3 cursor-pointer" onClick={(e)=> {handleToggleSidebar(false)}}>
                            <AiFillCloseCircle />
                        </div>
                        <Sidebar user={user && user} closeToggleSidebar={handleToggleSidebar}/>
                    </div>    
                )}
            </div>
            <div className='flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
                <Routes>
                    <Route path='/*' element={<Pins user={user}/>} />
                    <Route path='/feeds/:tag' element={<Pins user={user} />} />
                    <Route path='/user-profile/:userId' element={<UserProfile />} />
                    <Route path='/pin-detail/:pinId' element={<PinDetail />} />
                    <Route path='/create-pin' element={<CreatePin />} />
                </Routes>
            </div>
        </div>
    )
}
export default Home;