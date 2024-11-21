import React, { useEffect, useState } from "react";
import spotifyApi,{ setAuthToken } from '../controllers/SpotifyApi';

const Dashboard = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("spotifyToken");
    if (token) {
      setAuthToken(token);

      spotifyApi.get("/me/playlists")
        .then((response) => setPlaylists(response.data.items))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div>
      <h1>Mis Playlists</h1>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
