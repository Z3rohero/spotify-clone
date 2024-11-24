import { useEffect, useState } from "react";
import spotifyApi, { setAuthToken } from "../controllers/SpotifyApi";
import Nav from "../components/Nav";
import SpotifyPlayer from "../components/SpotifyPlayer";
import PlaylistCard from "../components/SpotifyCard";
import useStore from "../config/store";

const Dashboard = () => {
  const playlistData = useStore((state) => state.playlist); 
  console.log('Datos de la playlist:', playlistData);
  
  useEffect(() => {
    const token = localStorage.getItem("spotifyToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);
  
  return (
    <>
      <Nav />
        <div className="container mx-auto py-4">   
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6  overflow-auto " >       
              {
                playlistData.map((item, index) => {          
                  const url = item.album.images.map(({ url }) => url);
                  return (
                    <PlaylistCard
                      key={index}
                      title={item.album.name} 
                      subtitle={item.album.artists.map(artist => artist.name).join(", ")} 
                      imageUrl={url[0]} 
                      songs={item.album.songs} 
                      urlsong={item.preview_url} 
                    />
                  );
                })
              }
          </div>
        </div>
      <SpotifyPlayer />
    </>
  );
};

export default Dashboard;
