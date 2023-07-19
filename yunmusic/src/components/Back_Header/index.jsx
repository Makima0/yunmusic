import React from 'react'
import { Link, Route, Routes, useHistory, useLocation, useParams } from 'react-router-dom'
import {useState,useEffect} from 'react'

import './index.css'
export default function Back_Header() {
    const location=useLocation()
    const [pathState,setPathState]= useState(true)

    const goBack = () => {
        if(location.pathname=='/private'){
            window.history.go('/')
        }
        window.history.go(-1);
    };
    let { productId } = useParams()
    
    useEffect(()=>{
        if(location.pathname=='/Private/Personal_document'){
            setPathState(!pathState)
        }
        if(location.pathname.startsWith("/Private/Playlist/")===true){
            setPathState(false)
        }
        
    },[])
    return (
        <div className='Back_Header'>
            {!pathState&&<><Link className='Back-Link dark-link' to="#" onClick={goBack}/>
            <div className='Header_text'>我的资料</div></>}
            {pathState&&<Link className='Back-Link' to="#" onClick={goBack} />}
        </div>
    )
}
