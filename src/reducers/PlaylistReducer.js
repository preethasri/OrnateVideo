import { UPDATE_PLAYLISTS,UPDATE_SINGLE_PLAYLISTS } from "./constants";
const PlaylistReducer=(state,action)=>{
    switch(action.type){
        case UPDATE_PLAYLISTS :
            return {...state,playlists:[...action.payload]}
        
            case UPDATE_SINGLE_PLAYLISTS:
                const { _id: playlistID } = action.payload;
                const updatedPlaylists = state.playlists.map(playlist =>
                  playlist._id === playlistID ? action.payload : playlist
                );
                return { ...state, playlists: updatedPlaylists };

                default:
                    return state;
                }

}
export {PlaylistReducer}