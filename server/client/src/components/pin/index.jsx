import { Link, useNavigate } from "react-router-dom"
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { useDispatch, useSelector } from "react-redux"
import { deletePost, savePost, unSavePost } from "../../state-management/reducers/home-reducer"
import animalImg from '../../assets/images/animals/1.jpg'
import { useEffect, useRef, useState } from "react"
import { downloadImage } from "../../api-client"
import {Buffer} from 'buffer';

const Pin= ({ pin: {id, imageUrl, author, siteUrl, postSaved, savedCount}, savedPin, componentRef})=> {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const user= useSelector(state=> state.logon.user)
    const savedFeedIds= useSelector(state=> state.logon.savedFeedIds)
    const [imageBlobUrl, setImageBlobUrl]= useState("")
    const [showSaveOption, setShowSaveOption]= useState(true)

    // used local state as there is no need to pass around this piece of data between compoenents.
    const [ postHovered, setPostHovered ]= useState(false)

    useEffect(()=> {
        async function getImage(){
            const { data }= await downloadImage(imageUrl)
            setImageBlobUrl(URL.createObjectURL(new Blob([data], { type: 'image/jpg'})))
        }
        getImage()}, [])
    useEffect(()=>{
        setShowSaveOption(!savedFeedIds?.includes(id))
    }, [savedFeedIds])
    const savePin= ()=> {
        dispatch(savePost(id))
    }

    const unSavePin= ()=> {
        
    }

    const deletePin= ()=> {
        dispatch(savedPin ? unSavePost(id): deletePost(id))
    }
    
    return (
        <div ref={componentRef} className="m-1 mb-2">
            <div className="relative cursor-zoom-in" 
                onMouseEnter={(e)=> setPostHovered(true)} 
                onMouseLeave={(e)=> setPostHovered(false)}
                onClick={(e)=> navigate(`/pin-detail/${id}`)}
            >
                <img src={imageBlobUrl} alt="pin" className={`rounded-lg`}/>
                {( postHovered &&
                    <div className="absolute top-0 left-0 flex flex-col justify-between h-full w-full p-2">
                        <div className="flex justify-between items-center">
                            <a 
                                href={imageBlobUrl}
                                onClick={(e)=> e.stopPropagation()}
                                download={imageUrl}
                                className="bg-white rounded-full p-1 cursor-pointer opacity-75 hover:opacity-100"
                            >
                                <MdDownloadForOffline />
                            </a>
                            { postSaved? (
                                    <button type="button" className="bg-red-500 px-2 pb-1 rounded-3xl shadow-lg font-bold text-sm text-black cursor-pointer opacity-75 hover:opacity-100"
                                        onClick={(e)=> {e.stopPropagation(); unSavePin()}}
                                    >
                                        {savedCount} Saved
                                    </button>
                                ):(showSaveOption &&
                                    <button type="button" className="bg-red-500 px-2 pb-1 rounded-3xl shadow-lg font-bold text-sm text-black cursor-pointer opacity-75 hover:opacity-100"
                                        onClick={(e)=> {e.stopPropagation(); savePin()}}
                                    >
                                        Save
                                    </button>
                                )
                            }
                        </div>
                        <div className="flex justify-between items-center">
                            <a href={siteUrl} onClick={(e)=> e.stopPropagation()} className="w-30 bg-white rounded-lg text-sm pl-1 cursor-pointer opacity-75 hover:opacity-100 flex justify-between items-center gap-2"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <BsFillArrowUpRightCircleFill />
                                {siteUrl.length>10? siteUrl.substring(0,10): siteUrl}
                            </a>
                            
                            {/* Delete option should be visible only to author of post */}
                            {
                                (savedPin || user.id === author.id) && 
                                <AiTwotoneDelete fontSize={22} className="bg-white rounded-full p-1 cursor-pointer opacity-75 hover:opacity-100" 
                                onClick={(e)=> {e.stopPropagation(); deletePin()}}
                                />
                            }
                        </div>
                    </div>
                )}
            </div>
            
            <Link to={`/user-profile/${author.id}`} className='flex items-center gap-2 text-sm'>
                <img src={`/file/download?fileName=${author.profilePicUrl}`} alt="user-profile" className="rounded-full w-7" />
                {author.name}
            </Link>
        </div>
    )
}

export default Pin