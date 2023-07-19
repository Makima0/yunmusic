import axios from 'axios';
import React, { useState, useEffect, useContext, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

import Login from './components/Login'
import Side from './components/Side'
import Private from './components/Private'
import Personal_document from './components/Personal_document'
import './App.css';
import Playlists from './components/Playlists';

export const PrivateData = createContext()
export const Loginstate = createContext()
function App() {
  const myUid = 1516413046
  const [data, setData] = useState(null);
  const [LoginData, setLoginData] = useState(false)
  

  useEffect(() => {
    fetchData();
  }, [LoginData]);
  let data1
  function fetchData() {
    axios.get('https://api.hanling.space/user/detail?uid=' + myUid)
      .then(function (response) {
        data1 = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="App">
      <Loginstate.Provider value={[LoginData, setLoginData]}>

        <Routes>
          <Route path='/' element={
            <><Side />
              <Login /></>
          } />

          <Route exact path='/private' element={<Private />} />

          <Route path='/private/Personal_document' element={<Personal_document />} />
          <Route path='/private/Playlist/:listId' element={<Playlists/>}/>
        </Routes>
        </Loginstate.Provider>
    </div>
  );
}

export default App;
