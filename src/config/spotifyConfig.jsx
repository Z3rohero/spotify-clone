import { CLIENT_ID, } from "./config";
const REDIRECT_URI = "http://localhost:5173/callback";

//Alcance
const SCOPES = [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "playlist-read-private",
    "playlist-read-collaborative",
  ];
  
  export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
    "%20"
  )}`;