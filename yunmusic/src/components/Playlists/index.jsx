import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import Back_Header from '../Back_Header/Dark_link'
import start from './播放.png'
import more from './more.png'
import './index.css'
export default function Playlists() {
  const location = useLocation()
  const [PlaylistSongs, SetPlaylistSongs] = useState(null)
  const [PlaylistData, setPlaylistData] = useState(null)
  useEffect(() => {
    fetchData();
  }, []);
  let data1
  let data2
  function fetchData() {

    const pathnames = location.pathname.split('/')
    const listId = pathnames[pathnames.length - 1]
    axios.get('https://api.hanling.space/playlist/track/all?id=' + listId + '&limit20&offset=0')
      .then(function (response) {
        data1 = response.data
        const { songs, privileges, code } = data1
        SetPlaylistSongs(songs)
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get('https://api.hanling.space/playlist/detail?id=' + listId)
      .then(function (response) {
        data2 = response.data
        const playlist = data2.playlist
        setPlaylistData(playlist)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  if ((PlaylistSongs === null)) {
    return <div>loading...</div>
  }
  if (PlaylistData === null) {
    return <div>loading...</div>
  }
  return (

    <div style={{position:'absolute',width:'100%'}}>
      <Back_Header />
      <div className='PlaylistsHeader' style={{ display: 'flex', marginTop: "100px", marginLeft: '13px' }}>
        {/* {PlaylistData.map((listData, index) => ( */}
        {/* // !(listData.creator.userId == 1516413046) && */}
        <><div className='lists'>
          {/* <Link to={'/private/Playlist/' + `${listData.id}`} key={index} style={{ position: 'absolute', width: '90%', display: 'block', height: '50px' }} /> */}
          <img src={`${PlaylistData.coverImgUrl}`} style={{ width: '100px', borderRadius: '10px', marginTop: '10px' }} />
          <span style={{ fontWeight: 'bolder', fontSize: '20px', position: 'relative', top: '-80px', left: '10px' }}>{`${(PlaylistData.name.length > 14) ? (PlaylistData.name.slice(0, 14) + '...') : PlaylistData.name}`}</span><br />
          <span style={{ fontWeight: 'lighter', fontSize: '12px', }}>{PlaylistData.description && `${(PlaylistData.description.length > 30) ? (PlaylistData.description.slice(0, 30) + '...') : PlaylistData.description}`}</span >
        </div></>
        {/* // ))} */}
      </div>
      <div className='songs_box' >
        <div className='songs_header'>
          <img src={start} alt="" style={{ margin: '20px' }} />
          <span style={{ fontWeight: 'bolder', fontSize: '14px', position: 'relative', top: '-20px', left: '10px' }}>播放全部</span>
          <span style={{ fontWeight: 'lighter', fontSize: '12px', position: 'relative', top: '-20px', left: '15px' }}>({PlaylistSongs.length})</span ></div>
        <div className='songs_container'>
          {
            PlaylistSongs.map((songs, index) => (
              <div className='song_item' >
                <span style={{ padding: '10px', width: '20px', fontSize: '12px' }}>{index + 1}</span>
                <span style={{ fontWeight: 'bolder', fontSize: '13px', position: 'absolute', marginLeft: '10px', left: '10%' }}>{songs.name}</span><br />
                <span style={{ fontWeight: 'lighter', fontSize: '12px', position: 'absolute', marginLeft: '10px', left: '10%' }}>{`${songs.ar.map((name) => (name.name)).join('')}${songs.al.name}`}</span>
                <a className='more'></a>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}
