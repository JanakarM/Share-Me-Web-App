import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getUserProfile, setUserProfile, setUserProfileLoading } from "../../state-management/reducers/home-reducer"
import Spinner from "../spinner"

const UserProfile= ()=> {
    const { userId }= useParams()
    const loading= useSelector(state=> state.home.userProfileLoading)
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getUserProfile(userId))
    }, [userId])
    const user= useSelector(state=> state.home.userProfile)
    return (
        loading ? (
            <Spinner />
        ): (  (
            <div className="w-full h-full bg-white flex flex-col items-center gap-20">
                <div className="py-5 bg-gray-50 w-full min-h-30 max-h-50 flex justify-center items-center shadow-md p-10">
                    <img src={`/file/download?fileName=${user?.profilePicUrl}`} alt="user-profile" 
                        className="rounded-full max-h-full shadow-lg" />
                </div>
                <div className="flex flex-col items-center justify-between gap-10 w-full px-10">
                    <div className="flex w-full">
                        <label className="flex text-lg font-semibold w-1/2 justify-end pr-10"><span>Name</span></label>
                        <label className="text-lg text-gray-500">{user?.name}</label>
                    </div>
                    <div className="flex  w-full">
                        <label className="flex text-lg font-semibold w-1/2 justify-end pr-10"><span>Email</span></label>
                        <label className="text-lg text-gray-500">{user?.email}</label>
                    </div>
                </div>
            </div>
        )
        )
    )
}

export default UserProfile