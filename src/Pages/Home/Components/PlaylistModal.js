import {useState} from 'react'
import { usePlaylist } from '../../../Context';
import { useAuth } from '../../../Context';
import { createNewPlaylists} from '../../../helpers/PlaylistsHelpers';
import { PlaylistCheckbox } from './PlaylistCheckbox';
const PlaylistModal=({isPlaylistModalOpen,setIsPlaylistModalOpen,video})=>{
  const [showCreateNewPlaylist,setShowCreateNewPlaylist]=useState(false);
const [playlistName,setPlaylistName]=useState('')
  const {
     auth:{token},
 }=useAuth();
 const {
     playlistState:{playlists},
     playlistDispatch
    }=usePlaylist();

    
    return(
        <>
         <div className='dialog-box' style={{display:isPlaylistModalOpen ?"block":"none"}}>
             <div className='dialog-box-header'>
              <div className='dialog-box-title'>Save to...</div>
              <div>
                  <button className='material-icons card-menu-icon' onClick={()=>setIsPlaylistModalOpen(false)}>close</button>
              </div>
             </div>
             {playlists.length >0 && <hr className='divider' />}
             {playlists.map(playlist =>(
                 <PlaylistCheckbox playlist={playlist}  key={playlist._id}  video={video} />
             ))}
             <hr  className='divider'/>
             {showCreateNewPlaylist ?(<>
               <div className='dialog-box-new-input'>
                   <div className='dialog-box-header'>
                       <div className='dialog-box-input-header'>
                           Playlist Name

                       </div>
                       <div>
                           <button className='material-icons card-menu-icon' onClick={()=>setShowCreateNewPlaylist(false)}>arrow_back</button>
                       </div>

                   </div>
                   <input type="text"  className='input' placeholder='Enter Playlist Name..' autoComplete='off' value={playlistName} onChange={(e)=>setPlaylistName(e.target.value)}/>
                  <button className='dialog-box-button' disabled={!playlistName} onClick={()=>{
                      createNewPlaylists(token,playlistName,playlistDispatch)
                      setPlaylistName("")
                      setShowCreateNewPlaylist(false)
                    
                  }}>Create</button>
               </div>
             
             
             </>):
             
             
             
             (
               <>
               <button className='modal-btn' onClick={()=>setShowCreateNewPlaylist(true)}><span className='material-icons'>add</span>Create a New Playlist</button>
               </>
             )}

         </div>
         {isPlaylistModalOpen &&(
             <div className='dialog-box-check' style={{display:"block"}} onClick={()=>setIsPlaylistModalOpen(false)}>

             </div>
         )}
        
        </>
    )
}
export {PlaylistModal}