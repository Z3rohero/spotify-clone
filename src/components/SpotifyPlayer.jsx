import React, { useState, useRef,useEffect } from "react";
import ReactPlayer from "react-player";
import PlayIcon from "../assets/icons/PlayIcon";
import PauseIcon from "../assets/icons/PauseIcon";
import { RigthControlIcon, LeftControlIcon } from "../assets/icons/ControlIcon";
import useStore from "../config/store";

const SpotifyPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);

  const urlsong = useStore((state) => state.urlsong);


  const image = useStore((state) => state.image);
  const album = useStore((state) => state.album);
  const nameSong = useStore((state) => state.nameSong);
  
  
  useEffect(() => {
    if (urlsong) {
      setIsPlaying(true);
    }
  }, [urlsong]); 

  const changeVolume = (e) => {
    setVolume(e.target.value / 100); 
  };

  const nextTrack = () => {
    console.log("Siguiente canción");
  };

  const backTrack = () => {
    console.log("Canción anterior");
  };

  const handleProgress = (state) => {
    setProgress(state.played * 100); 
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value) / 100; 
    playerRef.current.seekTo(seekTo);
    setProgress(seekTo * 100);
  };

  return (
    urlsong && image ? (
      <div className="fixed bottom-0 w-full bg-zinc-950 flex items-center justify-between shadow-lg text-white p-4">
        
        {/* Información de la canción */}
        <div className="flex items-center gap-4">
          <img src={image} alt="Album cover" className="w-12 h-12 rounded" />
          <div>
            <p className="text-sm font-bold">{album}</p>
            <p className="text-xs text-gray-400">{nameSong}</p>
          </div>
        </div> 

        <div className="flex flex-col items-center justify-center space-y-3 w-1/2">
          {/* Botones de control */}
          <div className="flex items-center space-x-6">
            <button
              onClick={backTrack}
              className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-105"
              aria-label="Anterior"
            >
              <LeftControlIcon />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white p-2 rounded-full hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 hover:scale-105"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <button
              onClick={nextTrack}
              className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-105"
              aria-label="Siguiente"
            >
              <RigthControlIcon />
            </button>
          </div>

          <div className="w-full flex flex-col items-center space-y-1">
            <div className="text-xs flex justify-between w-full text-gray-400">
              <span>{(progress).toFixed(2)}%</span> {/* Tiempo dinámico */}
              <span>4:04</span>
            </div>
            <input
              type="range"
              className="w-full cursor-pointer"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Vol</span>
            <input
              type="range"
              className="w-24 cursor-pointer"
              min="0"
              max="100"
              value={volume * 100}
              onChange={changeVolume}
            />
          </label>
        </div>
        {/*Media */}
        <ReactPlayer
          ref={playerRef}
          url={urlsong}
          playing={isPlaying}
          volume={volume}
          width="0"
          height="0"
          onProgress={handleProgress} 
        />
      </div>
    ) : <div className="fixed bottom-0 w-full bg-zinc-950 flex items-center justify-center text-white p-4 shadow-lg">
          <span className="text-sm text-gray-400">No tiene canción previa</span>
       </div>
  );
};

export default SpotifyPlayer;
