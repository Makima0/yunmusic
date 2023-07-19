import React from 'react'
import { useState, useEffect, useContext } from "react";
import axios from 'axios';

import { Loginstate } from '../../App'
import './index.css'
import { NavLink } from 'react-router-dom';
export default function Side() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);
  const [loginState, setLoginState] = useContext(Loginstate)
  const myUid = 1516413046
  const [data, setData] = useState(null);
  const [userName,setUserName] = useState(null)
  useEffect(() => {
    fetchData();
  }, [loginState]);
  let data1
  function fetchData() {
    axios.get('https://api.hanling.space/user/detail?uid=' + myUid)
      .then(function (response) {
        data1 = response.data
        setUserName(data1.profile.nickname)

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      setCurrentX(e.touches[0].clientX);
    }

  };

  const handleTouchEnd = () => {
    if (startX && currentX) {
      const deltaX = currentX - startX;
      if (deltaX > 50) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
      setStartX(null);
      setCurrentX(null);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {<div
        className={`Side ${isSidebarOpen ? 'sidebar-open' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >{<>
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <button className="close-button" onClick={toggleSidebar}>
            &times;
          </button>
          <span>{userName}</span>
          <NavLink to={"/Private"} className='private'>个人主页</NavLink>
          <div className="menu-item">首页</div>
          <div className="menu-item">我的音乐</div>
          <div className="menu-item">朋友</div>
          <div className="menu-item">账号</div>
        </div>
        {isSidebarOpen && <div className="overlay" onClick={toggleSidebar} />}
        <div className="content">
          <a className="toggle-button" onClick={toggleSidebar}>
            ☰
          </a>
        </div>
        </>}
      </div>}
    </>
  );
}
