import React from 'react'
import { RiHomeFill, RiSaveFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { useSelector } from 'react-redux'

const Sidebar= ({ user, closeToggleSidebar })=> {
    const activeStyles= 'outline-none flex gap-3 px-5 items-center font-extrabold border-r-2 border-black transtion-all duration-200 ease-in-out'
    const inActiveStyles= 'outline-none flex gap-3 px-5 text-gray-500 items-center hover:text-black transtion-all duration-200 ease-in-out capitalize'
    const handleCloseToggle= ()=> {
        if(closeToggleSidebar) closeToggleSidebar(false)
    }
    const categories= useSelector(state=> state.home.categories)
    return (
        <div className='flex flex-col justfy-between pl-3 h-full min-w-210 overflow-y-scroll hide-scrollbar'>
            <Link to='/' className='w-190 my-6 pt-3 px-5'>
                <img src={logo} alt="logo" className='w-full cursor-pointer' onClick={(e)=> handleCloseToggle()}/>
            </Link>
            <div className='flex flex-col gap-3 h-full'>
                <NavLink to='/' className={({ isActive })=> isActive? activeStyles: inActiveStyles} onClick={(e)=> handleCloseToggle()}>
                    <RiHomeFill fontSize={15} /> 
                    Home
                </NavLink>
                <NavLink to='/feeds/saved' className={({ isActive })=> isActive? activeStyles: inActiveStyles} onClick={(e)=> handleCloseToggle()}>
                    <RiSaveFill fontSize={15} /> 
                    Saved
                </NavLink>
                <h6 className='mt-2 px-5 text-base 2xl:text-xl'>Discover Categories</h6>
                {categories.map(({id, categoryName})=> (
                    <NavLink to={`/category/${id}`} key={id} className={({ isActive })=> isActive? activeStyles: inActiveStyles} onClick={(e)=> handleCloseToggle()}>
                        {categoryName}
                    </NavLink>
                ))}
            </div>
            {( user && 
                <Link to={`/user-profile/${user?.id}`} className='flex bg-white rounded-lg shadow-md items-center m-3 p-3 gap-3' onClick={(e)=> handleCloseToggle()}>
                    <img src={`/file/download?fileName=${user.profilePicUrl}`} alt="user-profile" className="rounded-full w-10 h-10" />
                    {user?.name}
                </Link>
            )}
        </div>
    )
}

export default Sidebar