import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getPinDetail } from "../../state-management/reducers/home-reducer"
import { Spinner } from "../index"
import { BiLinkExternal, BiLink } from 'react-icons/bi'

const PinDetail= ()=> {
    const { pinId }= useParams()
    const loading= useSelector(state=> state.home.pinDetailLoading)
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getPinDetail(pinId))
    }, [pinId])
    const pin= useSelector(state=> state.home.pinDetail)
    return (
        loading ? (
            <Spinner></Spinner>
        ): (
            <div className="w-full h-full flex flex-col p-10">
                <div className="w-full max-h-70 flex flex">
                    <img src={`/file/download?fileName=${pin?.imageUrl}`} alt="" 
                    className="rounded-lg max-h-full"/>
                </div>
                <div class="pl-5 pt-2 text-3xl font-semibold">
                    {pin?.title}
                </div>
                <div className="flex flex-col gap-10 py-10 pl-5">
                    <div className="flex gap-5">
                        <label className="min-w-100 flex text-lg font-semibold"><span>About</span></label>
                        <label className="text-lg text-gray-500">{pin?.about}</label>
                    </div>
                    <div className="flex gap-5">
                        <label className="min-w-100 flex text-lg font-semibold"><span>Site</span></label>
                        <a target="_blank" className="hover:underline hover:shadow-sm hover:text-black text-lg text-gray-500" href={pin?.siteUrl}>{pin?.siteUrl}<BiLinkExternal className="inline ml-1 text-black"/></a>
                    </div>
                    <div className="flex gap-5">
                        <label className="min-w-100 flex text-lg font-semibold"><span>Author</span></label>
                        <Link to={`/user-profile/${pin?.author.id}`} className="hover:underline hover:shadow-sm hover:text-black text-lg text-gray-500">{pin?.author.name}<BiLink className="inline ml-1 text-black"/></Link>
                    </div>
                </div>
            </div>
        )
    )
}

export default PinDetail