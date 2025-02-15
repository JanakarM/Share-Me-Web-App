import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { MasonryLayout, Spinner } from "../index"
import { TbMoodEmpty } from 'react-icons/tb'
import { useDispatch } from "react-redux";
import { updateFeeds } from "../../state-management/reducers/home-reducer";

const Feed= ()=> {
    const { categoryId, tag }= useParams()
    const loading= useSelector(state=> state.home.feedLoading)
    const searchTerm= useSelector(state=> state.home.searchTerm)
    const savedFeedIds= useSelector(state=> state.logon.savedFeedIds)
    const { pageNumber, countPerPage }= useSelector(state=> state.home)
    const dispatch= useDispatch()
    useEffect(()=> {
        const pageInfo= {
            pageNumber: pageNumber, 
            countPerPage: countPerPage
        }
        dispatch(updateFeeds(pageInfo))
    }, [pageNumber])

    let feeds= useSelector(state=> state.home.feeds)
    if(categoryId !== undefined){
        feeds= feeds.filter(feed=> feed.category.id === parseInt(categoryId))
    }
    if(tag === 'saved'){
        feeds= feeds.filter(feed=> savedFeedIds?.includes(feed.id))
    }
    if(searchTerm !== ''){
        const searchTermUpperCase= searchTerm.toUpperCase()
        feeds= feeds.filter(feed=> feed.title.toUpperCase().indexOf(searchTermUpperCase) !== -1 || feed.about.toUpperCase().indexOf(searchTermUpperCase) !== -1)
    }
    
    if(loading) return <Spinner message='We are loading new ideas to your feed!'/>
    if(feeds.length === 0) return (
        <div className="flex flex-col items-center justify-end w-full h-full py-10 my-10 gap-4">
            <TbMoodEmpty fontSize={40}/>
            <p>Your feed is empty right now. Try again after some time!</p>
        </div>
    )
    return (
        <div>
            {feeds && <MasonryLayout feeds={feeds} savedPins={tag === 'saved'} />}
        </div>
    )
}

export default Feed