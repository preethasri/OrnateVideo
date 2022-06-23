import './SingleVideoPage.css'
import {useAuth,useHistory,useWatchLater,useLikes} from '../../Context/index'
import {useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { PlaylistModal } from '../Home/Components/PlaylistModal'
import { isInPlaylists } from '../../helpers/PlaylistsHelpers'
import ReactPlayer from 'react-player'
import { Navbar } from '../../Components/ComponentsExport'

const SingleVideoPage=()=>{
    const navigate=useNavigate();
    const[video,setVideo]=useState([])
    const {auth:{isAuthenticated}}=useAuth()
    const {history,addToHistoryVideos}=useHistory();
    const {watchLater,addToWatchlater,removeFromWatchlater}=useWatchLater()
    const {likedVideos,addToLikedVideos,removeFromLikedVideos}=useLikes()
    const isInLikedPlaylist=isInPlaylists(video,likedVideos)
    const isInWatchLater=isInPlaylists(video,watchLater)
    const {videoID}=useParams();
    const[isPlaylistModalOpen,setIsPlaylistModalOpen]=useState(false)


    useEffect(()=>{
       (async () =>{
    
          try {
             const response = await axios.get(`/api/video/${videoID}`);
                if (response.status === 200) {
                const data = response.data.video;
            
                setVideo(data);
                
                if (isAuthenticated && !isInPlaylists(data, history)) {
                   addToHistoryVideos(data);
            }
        }
      }
               catch(err){
                   console.log(err)
               }
    })()

       
      
    },[])

    const {title,creator,uploaded,views,description,creatorProfile}=video
   
   
     return(
        <>
        <Navbar />
        <div className='video-page-container'>
            
            <div  className='video-src'>
                <ReactPlayer
                 url={`https://www.youtube.com/watch?v=${videoID}`}
                 playing width="100%" height="100%" 
                
                 controls={true}
                
                />
             
            </div>
            <div className='video-page-title'>
                <header>{title}</header>

            </div>
            <div className="video-page-info">
                <div className='video-page-info left'>
                    <span>
                        {views}views
                    </span>
                    <p> •</p>
                    <span className='video-uploaded'>
                         {new Date(uploaded).toDateString().slice(4)}
                    </span>

                </div>
                <div className='video-page-info right'>
                    <button className={`video-page-btn material-icons ${isInLikedPlaylist && 'video-btn-active'}`}
                      onClick={()=>{
                          isInLikedPlaylist ?
                          removeFromLikedVideos(video)  
                          :isAuthenticated 
                          ?addToLikedVideos(video)
                          :navigate('/login')
                      }}

                    >
                        thumb_up

                    </button>
                    <button className={`video-page-btn material-icons ${isInWatchLater && 'video-btn-watchlater'}`}
                      onClick={()=>{
                        isInWatchLater ?
                        removeFromWatchlater(video)  
                        :isAuthenticated 
                        ?addToWatchlater(video)
                        :navigate('/login')
                      }}

                    >
                        watch_later

                    </button>
                    <button className='video-page-btn material-icons'
                    onClick={()=>isAuthenticated 
                          ?setIsPlaylistModalOpen(true)
                          :navigate("/login")
                        }
                    >
                      playlist_add
                    </button>
                    <PlaylistModal
                       isPlaylistModalOpen={isPlaylistModalOpen}
                       setIsPlaylistModalOpen={setIsPlaylistModalOpen}
                       video={video} />

                </div>

            </div>
            <div className='video-page-content'>
                <div className='video-creator'>
                    <div className='creator-profile'>
                        <img src={`https://yt3.ggpht.com/ytc/${creatorProfile}`}  className="creator-profile img"/>

                    </div>
                    <div className='creator-name'>
                        {creator}

                    </div>
                  

                </div>
                <div className='video-description'>
                    {description}

              </div>

            </div>

        </div>
        </>
    )
}

export {SingleVideoPage}