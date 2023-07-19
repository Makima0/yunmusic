import React from 'react'
import { useState, useEffect ,useContext} from "react";
import axios from 'axios';

import {Loginstate} from '../../App'
import logo from './网易云音乐.png'
import './index.css'
export default function Login() {
    const [inputPhone, setInputPhone] = useState('');
    const [inputCaptcha,setInputCaptcha] =useState('')
    // const [loginState,setLoginState] =useState(false)
    const [LoginData, setLoginData]=useContext(Loginstate)

  function PhoneData(phone){
    axios.get('https://api.hanling.space/captcha/sent?phone='+phone)
    .then( (response)=> {
      console.log(response.data);
    })
    .catch( (error)=> {
      console.log(error);
    });
  }
  function captchaData(captcha){
    axios.get('https://api.hanling.space/captcha/verify?phone='+inputPhone+'&captcha='+captcha)
    .then( (response)=> {
        setLoginData(true)
    })
    .catch( (error)=> {
      console.log(error);
    });
  }
  function handlePhone(value){
    setInputPhone(value)
  }
  function SubmitPhone(){
    PhoneData(inputPhone)
  }
  function handlecaptcha(value){
    setInputCaptcha(value)
  }
  function Submitcaptcha(){
    captchaData(inputCaptcha)
  }
    return (
        <div className="container" style={{}}>
            <img src={logo} className="logo" />
            {!(LoginData)&&<div className="login-form">
                <div className="form-group">
                    <label htmlFor="username">手机号码</label>
                    <input type="text" id="username" placeholder="请输入手机号码" value={inputPhone} onChange={e=>handlePhone(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="submit" onClick={SubmitPhone}>获取验证码</button>
                </div>
                <div className="form-group">
                    <label htmlFor="captcha">验证码</label>
                    <input  id="password" placeholder="请输入验证码" value={inputCaptcha} onChange={e=>handlecaptcha(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button type="submit" onClick={Submitcaptcha}>Login</button>
                </div>
            </div>}
            {LoginData&&<h2>您已成功登录！</h2>}
        </div>
    )
}
