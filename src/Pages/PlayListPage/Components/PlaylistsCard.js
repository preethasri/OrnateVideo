import { useState } from "react";
import { useAuth, usePlaylist } from "../../../Context";
import { deletePlaylists } from "../../../helpers/PlaylistsHelpers";
import { Link } from "react-router-dom";

import "./PlaylistCard.css"

const PlaylistCard=({playlist})=>{
    const{title,videos}=playlist;
   
    const [isDeleteDialogBox,setIsDeleteDialogBox]=useState(false);
   const {auth:{token}}=useAuth()
   const{playlistDispatch}=usePlaylist()
    return(
        <>
        <div className="playlist-container">
            <div className="playlist-info">
                <img src="./assets/playlist.svg"  className="playlist-img"/>
                <div className="playlist-flex">
                    <div>
                    <label className="dialog-box-header">{title}</label>
                
                    <span>{videos.length}videos</span>
                   </div>
                   <div className="delete-playlist">
                       <button className="delete-playlist-btn" onClick={()=>setIsDeleteDialogBox(true)}>
                           <span className="material-icons">delete</span>

                       </button>

                   </div>
                </div>
                <div className="dialog-box" style={{display:isDeleteDialogBox ?"block" :"none"}}>
                    <span className="dialog-box-header">delete playlist {title} ?</span>
                    <div className="dialog-box-delete-btns">
                        <button className="playlist-btn" onClick={()=>setIsDeleteDialogBox(false)}>cancel </button>
                        <button className="playlist-delete-button" onClick={()=>{
                            deletePlaylists(token,playlist,playlistDispatch); setIsDeleteDialogBox(false)}}>Delete</button>

                    </div>

                </div>
                {isDeleteDialogBox &&(
                    < div className="dialog-box-check" style={{display:"block"}}onClick={()=>setIsDeleteDialogBox(false)}>
                         
                    </div>
                )}
               <Link to={`/playlist/${playlist._id}`} className="nav-btn">
                   View Full Playlist 
               </Link>
              
            </div>

        </div>
        
        </>
    )
}
export {PlaylistCard}