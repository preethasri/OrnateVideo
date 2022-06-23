
import React from 'react'
import "./VideoCard.css"
import {useState} from 'react'
import { isInPlaylists } from '../../../helpers/PlaylistsHelpers'
import { useAuth } from '../../../Context'
import { Link,useNavigate } from 'react-router-dom'
import {PlaylistModal} from './PlaylistModal'
import { useLikes } from '../../../Context'
import { useWatchLater } from '../../../Context'

const VideoCard=({video})=>{
  const [isDropdownOpen,setIsDropdownOpen]=useState(false)
  const [isPlaylistModalOpen,setIsPlaylistModalOpen]=useState(false)
  const navigate=useNavigate();
  const {
    auth:
    {isAuthenticated}}=useAuth();
  const {likedVideos,removeFromLikedVideos,addToLikedVideos}=useLikes()
  const {watchLaterVideos,removeFromWatchLaterVideos,addToWatchLaterVideos}=useWatchLater()
  const isInLikedVideos=isInPlaylists(video,likedVideos)
  const isInWatchLater=isInPlaylists(video,watchLaterVideos)
    return(
        <>
        <div className="video-card-container">
    <div className="video-info">
    <Link to={`/video/${video._id}`} className="link-tag">
      <div className="video-thumbnail">
        <img src={`https://i.ytimg.com/vi/${video._id}/hq720.jpg`} alt="thumbnail" ></img>
      </div>
      </Link>
      
        <div className="video-flex">
            
                <div className="creator-profile-avatar">
                    <img src={` https://yt3.ggpht.com/ytc/${video.creatorProfile}`}alt="avatar" className="avatar"/>
               </div>
            
            <Link to={`/video/${video._id}`} className="link-tag">
                <div className="video-title">
                    <span>{video.title}</span>
                </div>
              </Link>
                <div className='dropdown-menu'>

                <button className="material-icons" onClick={()=>setIsDropdownOpen(prev =>!prev)}>more_vert</button>
                <div className='dropdown-menu-content' style={{display:isDropdownOpen ?"flex":"none" }}>
                  {isInLikedVideos ?( <button 
                  className='dropdown-btn'
                  onClick={()=>{
                    removeFromLikedVideos(video)
                    setIsDropdownOpen(false) }} >
                    <span className='material-icons'>thumb_up</span>
                    Liked</button>)
                    :(
                       <button className='dropdown-btn' 
                       onClick={()=>{
                         if(isAuthenticated){
                         addToLikedVideos(video); 
                         
                      }else{
                        navigate("/login")
                      }
                      }}
                       ><span className='material-icons'>thumb_up</span>Liked</button>
                    )}
                 
                 {isInWatchLater ?(
                 <button className='dropdown-btn' onClick={()=>removeFromWatchLaterVideos(video)}><span className='material-icons'>watch_later</span>Added To Watch Later</button>

                 ):(
                  <button className='dropdown-btn' onClick={()=>{
                    if(isAuthenticated){
                      addToWatchLaterVideos(video)

                  } else{
                    navigate("/login")
                  }
                }}><span className='material-icons'>watch_later</span>Add To Watch Later</button>
                 )}


                  
                  <button className='dropdown-btn' onClick={()=>{
                    if(isAuthenticated){
                      setIsPlaylistModalOpen(true); 
                      setIsDropdownOpen(false)}
                      else{
                    navigate('/login')
                  }}}><span className='material-icons'>playlist_add</span>add to playlist</button>
                   </div>
                </div>
                 <PlaylistModal  isPlaylistModalOpen={isPlaylistModalOpen} setIsPlaylistModalOpen={setIsPlaylistModalOpen} video={video}/>
               
        </div>
        <Link className="link-tag" to={`/video/${video._id}`} >
        <div className="video-creator-name"> 
              <span>{video.creator}</span>
            </div>
          <div className="video-date-and-views">
            <div className="video-views">
                    <span>{video.views}  views</span>
                    <span> •</span>
              </div>
              <div className="video-date">
                <span> {new Date(video.uploaded).toDateString().slice(4)} </span>
       
                
              </div>
              
            </div>
            </Link>
            
        
     </div>

      
    </div>
      
    
  
        </>

    )
}
export {VideoCard}