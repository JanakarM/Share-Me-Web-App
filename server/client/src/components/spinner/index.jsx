import React from 'react'
import { Circles } from 'react-loader-spinner'

const Spinner= ({ message })=> {
    return (
        <div className='flex flex-col justify-center items-center w-full h-full mt-6'>
            <Circles color='#00BFFF' height={50} width={50}/>
            <p className='text-lg text-center px-2'>{message ? message : "Loading...!!"}</p>
        </div>
    )
}

export default Spinner