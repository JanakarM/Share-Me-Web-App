import Masonry from 'react-masonry-css'
import { Pin } from '../index'
import React, { useRef, useCallback } from 'react'
import { nextPage } from '../../state-management/reducers/home-reducer'
import { useDispatch, useSelector } from 'react-redux'

const MasonryLayout= ({ feeds, savedPins })=> {
    const breakPointObj= {
        default: 4,
        3000: 6,
        2000: 5,
        1200: 3,
        1000: 2,
        500: 1
    }
    const { pageNumber, countPerPage }= useSelector(state=> state.home)
    const dispatch= useDispatch()
    const observer= useRef()
    const lastPinRef= useCallback((ele)=>{
        console.log(ele+" "+pageNumber)
        if(observer.current) observer.current.disconnect()
        if(ele){
            observer.current= new IntersectionObserver(entries=> {
                if(entries[0].isIntersecting){
                    console.log('visible')
                    dispatch(nextPage())
                }
            })
            observer.current.observe(ele)
        }
    }, [feeds])

    return (
        <div>
            <Masonry className='flex animate-slide-fwd' breakpointCols={breakPointObj}>
                { feeds?.map((feed, index)=> (
                    (index+1 == countPerPage*pageNumber)?
                        <Pin componentRef={lastPinRef} key={feed.id} pin={feed} savedPin={savedPins} />
                    :
                        <Pin key={feed.id} pin={feed} savedPin={savedPins} />
                )) }
            </Masonry>
        </div>
    )
}

export default MasonryLayout