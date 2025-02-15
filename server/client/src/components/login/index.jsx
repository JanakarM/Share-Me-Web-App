import bg from '../../assets/videos/share.mp4'
import logo from '../../assets/images/logowhite.png'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { getUserFromToken, setAuthToken } from '../../utils'
import { login } from '../../state-management/reducers/logon-reducer'
import React, { useEffect, useRef } from 'react'

const Login = ()=>{
    const user = useSelector(state => state.logon.user)
    const dispatch = useDispatch()
    const { route, id }= useParams()
    const responseGoogle = (response)=>{
        console.log('token: '+response.credential)
        dispatch(login(response.credential))
    }
    const signInDiv = useRef()
    useEffect(()=>{
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_API_CLIENT_ID,
            callback: responseGoogle
        })

        google.accounts.id.renderButton(
            signInDiv.current,
            { theme: "outline", size: "large"}
        )

        google.accounts.id.prompt()
    }, [])
    return (
        (user === undefined) ? 
        (
            <div className='h-screen'>
                <div className='w-full h-full'>
                    <video
                        src={bg}
                        loop
                        muted
                        type='video/mp4'
                        autoPlay
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='absolute top-0 left-0 bg-blackOverlay w-full h-full flex flex-col items-center justify-center'>
                    <div className='p-5'>
                        <img 
                            src={logo}
                            width='130px'
                            alt={"app-logo"}
                        />
                    </div>
                    <div ref={signInDiv} className='shadow-2xl'>
                    </div>
                </div>
            </div>
        )
        // : (<Navigate to={`/${route? route+ (id? '/'+id: '') : ''}`} />)
        : (<Navigate to='/' />)
    );
}

export default Login;