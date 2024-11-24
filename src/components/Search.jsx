import { useState, useRef } from "react";
import spotifyApi from '../controllers/SpotifyApi';
import useStore from "../config/store.jsx";
import SearchIcon from '../assets/icons/SearchIcon';
import ExploreIcon from "../assets/icons/ExploreIcon";
import ClearIcon from "../assets/icons/ClearIcon";

const Search = () => {
  const [query, setQuery] = useState("");
  const setPlaylist = useStore((state) => state.setPlaylist);
  const inputRef = useRef(null);

  const onSearch = (query) => {
    spotifyApi
      .get("/search", {
        params: {
          q: query,
          type: "track,album", 
          limit: 20, 
        },
      })
      .then((response) => {
        console.log("Respuesta:", response.data);
        const tracks = response.data.tracks?.items || [];
        console.log("Resultados:", tracks);
        setPlaylist(tracks);
      })
      .catch((err) => console.error("Error al buscar:", err));
  };

  const onExplore = () => {
    spotifyApi
      .get("/browse/categories", {
        params: {
          type: "categories",
          limit: 10, 
          locale: "es_CO",
        },
      })
      .then((response) => {
        console.log("Respuesta:", response.data);
        const categories = response.data.categories?.items || [];
        console.log("Resultados:", categories);
        //setPlaylist(categories); 
      })
      .catch((err) => console.error("Error al buscar:", err));
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    if (newQuery) {
      onSearch(newQuery);
    } else {
      onExplore();
    }
  };

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="group flex items-center cursor-pointer bg-tertiary-dark rounded-full px-4 py-2 w-full h-full max-w-lg mx-auto shadow-md focus-within:ring-2 focus-within:ring-white text-neutral transition-colors hover:bg-quaternary-dark border-[1px] border-transparent hover:border-[1px] hover:border-neutral"
    >
      <button onClick={handleIconClick} className="transition-colors group-hover:text-white group-focus-within:text-white group-focus-within:cursor-default">
        <SearchIcon />
      </button>
      <input
        ref={inputRef}
        type="text"
        placeholder="¿Qué quieres reproducir?"
        value={query}
        onChange={handleChange}
        className="flex-1 bg-transparent text-white placeholder-neutral outline-none px-2 cursor-pointer group-focus-within:cursor-text"
      />
      
      <div className={`border-l pl-2 h-6 ${query.length ? 'border-transparent' : '' }`}>
        {query.length ? (
            <button
              onClick={() => setQuery("")}
              className="h-fit cursor-pointer transition-all hover:scale-105 hover:text-white"
            >
              <ClearIcon />
            </button>
        )
        : 
        (
            <button
              onClick={onExplore}
              className="h-fit cursor-pointer transition-all hover:scale-105 hover:text-white"
            >
              <ExploreIcon />
            </button>
        )}
      </div>
    </div>
  );
};

export default Search;
