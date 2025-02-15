import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../index'
import { useEffect } from "react";
import { createPost, setCreatePinStatus } from "../../state-management/reducers/home-reducer";

const CreatePin= ()=> {
    const user= useSelector(state=> state.logon.user)
    const createPinStatus= useSelector(state=> state.home.createPinStatus)
    const categories= useSelector(state=> state.home.categories)
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const savePin= ()=> {
        dispatch(createPost(getPinDetail()))
    }
    const getPinDetail= ()=> {
        var formData= new FormData();
        formData.append('title', title);
        formData.append('about', about);
        formData.append('image', uploadedImageFile);
        formData.append('site', site);
        formData.append('category', category);
        formData.append('author', user.id)
        return formData
    }
    useEffect(()=> {
        if(createPinStatus !== undefined){
            setLoadingMessage(`${createPinStatus}..! Redirecting to Feeds page`)
            navigate('/');
            dispatch(setCreatePinStatus(undefined))
        }
    }, [createPinStatus])
    useEffect(()=> {
        if(categories[0] != undefined){
            setCategory(categories[0].id)
        }
    }, [categories])
    const uploadImage=(e)=> {
        const file= e.target.files[0]
        const { type, name }= file
        if(type == 'image/png' || type == 'image/jpeg' || type == 'image/jpg' || type == 'image/gif'){
            setImageError(false)
            setLoading(true)
            setLoadingMessage('Loading...')
            setUploadedImageFile(file)
            setImageAsset(URL.createObjectURL(file))
            setLoading(false)
        }else{
            setImageError(true)
        }
    }
    const [emptyFields, setEmptyFields]= useState(false)
    const [imageError, setImageError]= useState(false)
    const [imageAsset, setImageAsset]= useState("")
    const [uploadedImageFile, setUploadedImageFile]= useState("")
    const [title, setTitle]= useState("")
    const [about, setAbout]= useState("")
    const [category, setCategory]= useState("")
    const [site, setSite]= useState("")
    const [loading, setLoading]= useState(false)
    const [loadingMessage, setLoadingMessage]= useState("")
    return (
        <div className="flex flex-col justify-center items-center lg:h-3/5 mt-5 h-screen">
            {loading && <Spinner message={loadingMessage}/>}
            { emptyFields &&<p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">Please enter the pin details</p> }
            <div className="flex flex-col w-full h-full bg-white lg:w-3/5 p-3">
                <div className="bg-secondaryColor w-full flex flex-1 p-3 justify-center items-center">
                    <div className="border-2 border-dotted border-gray-300 w-full h-[420px] flex justify-center items-center">
                        { imageAsset? ( 
                            <div className="w-full h-full relative">
                                <img src={imageAsset} alt="uploaded-image" 
                                    className="w-full h-full object-cover"/>
                                <button onClick={(e)=> setImageAsset(null)} 
                                    className="bg-white p-2 rounded-full cursor-pointer outline-none hover:shadow-xl transition-all duration-150 ease-in-out absolute bottom-3 right-3">
                                    <MdDelete />
                                </button>
                            </div> ):(
                            <label>
                                <div className="flex flex-col justify-center items-center">
                                    <AiOutlineCloudUpload />
                                    <label>Click to upload</label>
                                    { imageError &&  <p className="text-red-500">Please upload valid image</p>}
                                    <p className="mt-20 text-sm font-light">Upload jpg, jpeg, png, gif format files less than 5 MB</p>
                                </div>
                                <input type="file" onChange={(e)=> uploadImage(e)} className="w-0 h-0"/>
                            </label>
                        )
                        }
                    </div>
                </div>
                <div className="mt-5 w-full">
                    <input value={title} onChange={(e)=> setTitle(e.target.value)} type="text" placeholder="Add title" className="px-2 py-1 w-full rounded-lg outline-none border-b-2 focus-within:shadow-md"/>
                </div>
                <div className="mt-5 flex gap-2 items-center shadow-sm p-2 rounded-full">
                    <img src={`/file/download?fileName=${user.profilePicUrl}`} width={50} alt="user-profile" className="rounded-full"/>
                    <p className="text-3xl font-semibold">{user?.name}</p>
                </div>
                <div className="mt-5 w-full">
                    <input value={about} onChange={(e)=> setAbout(e.target.value)} type="text" placeholder="What is your post about?" className="px-2 py-1 w-full rounded-lg outline-none border-b-2 focus-within:shadow-md"/>
                </div>
                <div className="mt-5 w-full">
                    <input value={site} onChange={(e)=> setSite(e.target.value)} type="text" placeholder="Add your site link" className="px-2 py-1 w-full rounded-lg outline-none border-b-2 focus-within:shadow-md"/>
                </div>
                <div className="mt-5 p-2">
                    <p className="font-bold text-xl">
                        Choose category
                    </p>
                    <select className="mt-3 w-full p-2 rounded-lg cursor-pointer bg-white border-b-2 focus-within:shadow-md" onChange={(e)=> setCategory(e.target.value)}>
                        {categories.map((c)=> (
                            <option key={c.id} className="bg-white" value={c.id}>{c.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end items-end m-5">
                    <button className="rounded-lg bg-red-500 text-xl px-2 py-1"
                    onClick={savePin}>
                        Create Pin
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreatePin