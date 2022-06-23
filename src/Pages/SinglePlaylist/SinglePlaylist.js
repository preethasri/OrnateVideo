import "./SinglePlaylist.css"
import { useParams } from "react-router-dom"
import { usePlaylist } from "../../Context"
import {SinglePlaylistCard} from './SinglePlaylistCard'
import { Navbar } from "../../Components/ComponentsExport"
const SinglePlaylist=()=>{
    const {playlistState:{playlists}}=usePlaylist()
    const {playlistID}=useParams();
    const playlist=playlists.find(playlist=>playlist._id===playlistID)
    const {title,videos}=playlist
    
    
    return(
        <>
         <Navbar />
         <div className="single-playlist">
             <header className="playlist-title">
                 <span className="material-icons text-lg">playlist_play</span>
                  {title}
                 
             </header>
             <p >{videos.length}videos</p>
             <div className="playlist-video-container">
                 {videos.map(video=>(
                     <SinglePlaylistCard playlistTitle={title} playlist={playlist} key={playlistID} video={video} />
                 ))}

             </div>

         </div>
        </>
    )
   


}
export {SinglePlaylist}