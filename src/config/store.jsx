import { create } from 'zustand';

const useStore = create((set) => ({
  playlist: [], 
  setPlaylist: (newPlaylist) => set({ playlist: newPlaylist }), 
  urlsong: '', 
  setUrlsong: (newUrlsong) => set({ urlsong: newUrlsong }), 
  nameSong: '', 
  setNamesong: (newNameSong) => set({ nameSong: newNameSong }), 
  album: '', 
  setAlbum: (newAlbum) => set({ album: newAlbum }), 
  image: '', 
  setImage: (newImage) => set({ image: newImage }), 
}));


export default useStore;