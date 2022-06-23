export const isInPlaylists = (video, playlistName) =>
  playlistName?.find(playlistVideo => playlistVideo.id === video.id);