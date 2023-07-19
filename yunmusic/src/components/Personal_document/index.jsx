import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Back_Header from '../Back_Header'
import { useEffect, useState } from 'react'
import axios from 'axios'

import './index.css'
import avatar from './avatar.jpg'
export default function Personal_document() {
    const [gender, setGender] = useState(null)
    const [signature, setSignature] = useState(null)
    const [nickname, setNickname] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [year, setYear] = useState(null)
    const [month, setMonth] = useState(null)
    const [day, setDay] = useState(null);
    const hour = 12;
    const minute = 0;
    const second = 0;
    const milliseconds = 0;
    useEffect(() => {
        fetchData();
    }, [gender, signature, nickname, birthday, year, month, day]);
    let data1
    function fetchData() {
        axios.get('http://localhost:3000/user/update?gender=' + gender + '&signature=' + signature + '&city=500101&nickname=' + nickname + 'binary&birthday=' + birthday + '&province=500000')
            .then(function (response) {
                data1 = response.data
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const myUid = 1516413046
    const [userData,setUserData] = useState(null)
    useEffect(() => {
        fetchData();
      }, []);
      let data2
      function fetchData() {
        axios.get('https://api.hanling.space/user/detail?uid=' + myUid)
          .then(function (response) {
            data2 = response.data
            setUserData(data2.profile)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
if(userData==null){
    return <div>loading...</div>
}
    return (
        <><Back_Header />
            <div className='Personal_document_box'>
                <div className='Personal_document_cart'>
                    <div className='Personal_document_item'>头像<div className=' avatar' style={{ left: '330px', width: '50px', height: '50px', marginTop: '-45px' }}>
                        <img src={avatar} className='' style={{ width: '90px', height: 'auto', position: 'absolute', right: '0px' }} /></div></div>
                    <div className='Personal_document_item'>昵称<input onChange={e => setNickname(e.target.value)} value={nickname} className='Personal_document_item_text' placeholder={`${userData.nickname}`}/></div>
                    <div className='Personal_document_item'>性别<input onChange={e => setGender(e.target.value)} value={gender} className='Personal_document_item_text' placeholder={`${(userData.gender>0)?'男':'女'}`}/></div>
                    <div className='Personal_document_item' style={{ borderBottom: 'none', marginBottom: 'none', paddingBottom: '0px' }}>二维码<input className='Personal_document_item_text' placeholder="" /></div>
                </div>
                <div className='Personal_document_cart'>
                    <div className='Personal_document_item'>生日<input onChange={e => setBirthday(e.target.value)} value={birthday} className='Personal_document_item_text' /></div>
                    <div className='Personal_document_item'>地区<input className='Personal_document_item_text' /></div>
                    <div className='Personal_document_item'>大学<input className='Personal_document_item_text' placeholder="重庆邮电大学"/></div>
                    <div className='Personal_document_item'>音乐标签<input className='Personal_document_item_text' /></div>
                    <div className='Personal_document_item' style={{ borderBottom: 'none', marginBottom: 'none', paddingBottom: '0px' }}>简介<input onChange={e => setSignature(e.target.value)} value={signature} className='Personal_document_item_text' placeholder="" /></div>

                </div>
                <div className='Personal_document_cart'>
                    <div className='Personal_document_item'>个人主页隐私设置<input className='Personal_document_item_text' />
                    </div>
                    <div className='Personal_document_item' style={{ borderBottom: 'none', marginBottom: 'none', paddingBottom: '0px' }}>主页模块顺序设置<input className='Personal_document_item_text' placeholder="" /></div>
                </div>
                <div className='Personal_document_cart'>
                    <div className='Personal_document_item' style={{ borderBottom: 'none', marginBottom: 'none', paddingBottom: '0px' }}>账户和绑定设置<input className='Personal_document_item_text' placeholder="" /></div>
                </div>
            </div >
        </>
    )
}
