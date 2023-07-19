import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { useEffect, useRef } from 'react';
import axios from 'axios'

import Header_img from './Header_img.png'
import Back_Header from '../Back_Header'
import avatar from './avatar.jpg'
import './index.css'

export default function Private() {
    const myUid = 1516413046
    const [PrivateState, setPrivateState] = useState(null)
    const [listLength,setListLength] = useState(0)
    useEffect(() => {
        fetchData();
    }, []);
    let data1
    function fetchData() {
        axios.get('https://api.hanling.space/user/playlist?uid=' + myUid)
            .then(function (response) {
                data1 = response.data
 
                const { version, more, playlist, code } = response.data
                setPrivateState(playlist)

                let flag=0
                playlist.map((ordered,index)=>{
                    if(ordered.ordered === false){
                        flag++;  
                    }
                })
                setListLength(flag)

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const [linkColor1, setLinkColor1] = useState('black');
    const [linkColor2, setLinkColor2] = useState('#888');
    const [linkColor3, setLinkColor3] = useState('#888');
    const [barStation, setBarStation] = useState(0)
    function handleClick(index) {
        setLinkColor1((0 - index) ? '#888' : 'black');
        setLinkColor2((1 - index) ? '#888' : 'black');
        setLinkColor3((2 - index) ? '#888' : 'black');
        setBarStation(550 * index)
        let card=document.querySelector('.profile-card-main')
        card.scrollLeft=390*index
    };


    let scrollTimer
    const handleScroll = (e) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
            if (e.target.scrollLeft < 100) {
                setLinkColor1((0 - 0) ? '#888' : 'black');
                setLinkColor2((1 - 0) ? '#888' : 'black');
                setLinkColor3((2 - 0) ? '#888' : 'black');
                e.target.scrollLeft = 0
                setBarStation(550 * 0)
            }
            if (e.target.scrollLeft > 100 && e.target.scrollLeft < 500) {
                setLinkColor1((0 - 1) ? '#888' : 'black');
                setLinkColor2((1 - 1) ? '#888' : 'black');
                setLinkColor3((2 - 1) ? '#888' : 'black');
                e.target.scrollLeft = 390
                setBarStation(550 * 1)
            }
            if (e.target.scrollLeft > 500) {
                setLinkColor1((0 - 2) ? '#888' : 'black');
                setLinkColor2((1 - 2) ? '#888' : 'black');
                setLinkColor3((2 - 2) ? '#888' : 'black');
                e.target.scrollLeft = 780
                setBarStation(550 * 2)
            }

        }, 200);

    };
if (PrivateState === null) {
    return <div>Loading...</div>;
  }
    return (
        <div className='Private-box'>
            <div className='Header'>
                <Back_Header />
                <img src={Header_img} className='Header_img'>
                </img>
            </div >
            <div className="profile-card Personal_document">
                <div className="avatar">
                    <img src={avatar} alt="Avatar" style={{ width: '120px', height: 'auto', position: 'absolute', right: '0px' }} />
                </div>
                <div className="user-info">
                    <div className="username">{PrivateState[0].name.replace("喜欢的音乐", "")}</div>
                    {/* <div className="user-description">个人简介</div> */}
                    <Link to={'/Private/Personal_document'} className="Personal_document_button">编辑资料</Link>
                </div>
            </div>
            <div className='Tab'>
                <div className='Tab-Link-box'>
                    <Link className='Tab-Link' onClick={() => handleClick(0)} style={{ color: linkColor1 }} to={'/Private'}>主页</Link>
                    <Link className='Tab-Link' onClick={() => handleClick(1)} style={{ color: linkColor2, }} to={'/Private' }>动态</Link>
                    <Link className='Tab-Link' onClick={() => handleClick(2)} style={{ color: linkColor3, }} to={'/Private' }>播客</Link>
                </div>
                <div className='Tab-bar-box'>
                    <div className='Tab-bar' style={{ transform: `translate(${barStation}%,0)` }}></div>
                </div>
            </div>
            <div className='profile-card-main' onScroll={handleScroll}>
                <div className='profile-card-container'>
                    <div className='profile-card-box' >
                        <div className='profile-card'>
                            <div style={{ fontWeight: 'bold', fontSize: '20px' }}>创建的歌单<span style={{ fontWeight: 'lighter', color: '#888', fontSize: '12px' }}>({`${listLength}`}个)</span>
                                {PrivateState.map((listData, index) => (
     
                                    (listData.creator.userId == 1516413046) && 
                                    <><div className='lists' key={index}>
                                        <Link to={'/private/Playlist/'+`${listData.id}`} key={index} style={{position:'absolute',width:'90%',display:'block',height:'50px'}}/>
                                        <img src={`${listData.coverImgUrl}`} style={{ width: '50px', borderRadius: '10px', marginTop: '10px' }} />
                                        <span style={{ fontWeight: 'lighter', fontSize: '18px', position: 'relative', top: '-25px', left: '10px' }}>{`${(listData.name.length > 14) ? (listData.name.slice(0, 14) + '...') : listData.name}`}</span><br />
                                        <span style={{ fontWeight: 'lighter', fontSize: '12px', position: 'relative', top: '-25px', left: '60px' }}>{`${listData.trackCount}首`}</span >
                                    </div></>

                                    // <Link to='/private/Playlist' key={index} />
                                ))}</div>
                        </div>
                        <div className='profile-card'><div style={{ fontWeight: 'bold', fontSize: '20px' }}>收藏的歌单<span style={{ fontWeight: 'lighter', color: '#888', fontSize: '12px' }}>({PrivateState.length-listLength}个)</span>
                            {PrivateState.map((listData, index) => (

                                !(listData.creator.userId == 1516413046) && 
                                <><div className='lists' key={index}>
                                    <Link to={'/private/Playlist/'+`${listData.id}`} key={index} style={{position:'absolute',width:'90%',display:'block',height:'50px'}}/>
                                    <img src={`${listData.coverImgUrl}`} style={{ width: '50px', borderRadius: '10px', marginTop: '10px' }} />
                                    <span style={{ fontWeight: 'lighter', fontSize: '18px', position: 'relative', top: '-25px', left: '10px' }}>{`${(listData.name.length > 14) ? (listData.name.slice(0, 14) + '...') : listData.name}`}</span><br />
                                    <span style={{ fontWeight: 'lighter', fontSize: '12px', position: 'relative', top: '-25px', left: '60px' }}>{`${listData.trackCount}首`}</span >
                                </div></>
                                
                            ))}</div></div>
                        <div className='profile-card'></div>
                    </div>
                    <div className='profile-card-box'>
                        <div className='profile-card'></div>
                        <div className='profile-card'></div>
                        <div className='profile-card'></div>
                    </div>
                    <div className='profile-card-box'>
                        <div className='profile-card'></div>
                        <div className='profile-card'></div>
                        <div className='profile-card'></div>
                    </div>
                </div>
            </div>
        </div >
    )
}
