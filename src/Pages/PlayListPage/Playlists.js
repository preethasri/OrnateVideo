import './Playlists.css'
import { PlaylistCard } from './Components/PlaylistsCard';
import {usePlaylist} from '../../Context/index'
import { Navbar } from '../../Components/ComponentsExport';

const Playlists=()=>{
    const {
        playlistState:{playlists},
    }=usePlaylist();
  console.log(playlists)
    return(
        <>
        <Navbar />
        <div className='playlists-title'>
            <span className='material-icons text-lg'>playlist_play</span>
             Playlists
            </div> 
            <div className='playlist-grid-container'>
            {playlists.map(playlist => (
          <PlaylistCard playlist={playlist} key={playlist._id} />
        ))}
                </div>       
        </>
    )
}
export {Playlists}