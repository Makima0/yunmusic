import React from 'react'
import { Link, Route, Routes, useHistory, useLocation, useParams } from 'react-router-dom'
import {useState,useEffect} from 'react'

import './index.css'
export default function Back_Header() {
    const location=useLocation()
    const [pathState,setPathState]= useState(true)

    const goBack = () => {
        window.history.go(-1);
    };
    let { productId } = useParams()
    return (
        <div className='Back_Header' style={{backgroundColor: 'rgba(0,0,0,0)'}}>
            {<><Link className='Back-Link dark-link' to="#" onClick={goBack}/>
            <div className='Header_text'>歌单</div></>}
        </div>
    )
}