import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import PlayIcon from "../assets/icons/PlayIcon";
import PauseIcon from "../assets/icons/PauseIcon";
import { RigthControlIcon, LeftControlIcon } from "../assets/icons/ControlIcon";
import * as Slider from "@radix-ui/react-slider";
import useStore from "../config/store";

const SpotifyPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
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

  const handleSeek = (value) => {
    const seekTo = value / 100;
    playerRef.current.seekTo(seekTo);
    setProgress(value);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return urlsong && image ? (
    <div className="fixed bottom-0 w-full bg-zinc-950 flex items-center justify-between shadow-lg text-white p-4">
      {/* Información de la canción */}
      <div className="flex items-center gap-4">
        <img src={image} alt="Album cover" className="w-12 h-12 rounded" />
        <div>
          <p className="text-sm font-bold">{album}</p>
          <p className="text-xs text-gray-400">{nameSong}</p>
        </div>
      </div>

      {/* Controles */}
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

        {/* Slider de progreso */}
        <div className="w-full flex flex-col items-center space-y-2">
          {/* Indicadores de tiempo */}
          <div className="text-xs flex justify-between w-full text-gray-400">
            <span>{formatTime((progress / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Slider.Root
            className="relative flex h-5 w-full touch-none select-none items-center"
            value={[progress]}
            onValueChange={(values) => handleSeek(values[0])}
            max={100}
            step={0.1}
          >
            {/* Barra de fondo del slider */}
            <Slider.Track className="relative h-[4px] w-full rounded-full bg-gray-700">
              {/* Barra de progreso */}
              <Slider.Range className="absolute h-full rounded-full bg-green-500" />
            </Slider.Track>
            {/* Indicador del slider */}
            <Slider.Thumb
              className="block w-4 h-4 bg-green-500 rounded-full shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-300"
              aria-label="Progress"
            />
          </Slider.Root>
        </div>
      </div>

      {/* Volumen */}
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

      {/* Reproductor multimedia */}
      <ReactPlayer
        ref={playerRef}
        url={urlsong}
        playing={isPlaying}
        volume={volume}
        width="0"
        height="0"
        onProgress={handleProgress}
        onDuration={(dur) => setDuration(dur)}
      />
    </div>
  ) : (
    <div className="fixed bottom-0 w-full bg-zinc-950 flex items-center justify-center text-white p-4 shadow-lg">
      <span className="text-sm text-gray-400">No tiene canción previa</span>
    </div>
  );
};

export default SpotifyPlayer;
