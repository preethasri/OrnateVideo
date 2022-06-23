import {useState} from 'react';
import { useAuth } from '../../../Context';
import { usePlaylist } from '../../../Context';
import { isInPlaylists,addVideoToPlaylists,removeVideoFromPlaylists } from '../../../helpers/PlaylistsHelpers';


const PlaylistCheckbox=({playlist,video})=>{
    const {
        auth:{token}
    }=useAuth();
    const {playlistDispatch}=usePlaylist();
    const [isChecked,setIsChecked]=useState(isInPlaylists(video,playlist.videos))
    const checkboxHandler=()=>{
        if(isChecked){
            removeVideoFromPlaylists(token,video,playlist,playlistDispatch)
            setIsChecked(false)
       }
       else{
           addVideoToPlaylists(token,video,playlist,playlistDispatch)
           setIsChecked(true)
       }
    }
   console.log(playlist)
    return(
        <>
        <div className='dialog-box-input-checkbox' onClick={checkboxHandler}>
        <button className='dialog-box-btn material-icons-outlined '>{isChecked ? "check_box" :"check_box_outline_blank"}</button>
        <div className='label'>{playlist.title}</div>
       </div>
         
        </>
    )
}
export {PlaylistCheckbox}

