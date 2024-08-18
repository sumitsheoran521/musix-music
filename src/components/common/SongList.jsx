import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import {fetchSong} from "../../api/allAPIs";
import useNameFormatter from "../../hooks/useNameFormatter";
import { languages } from "../../services/languages";
import SongAlbum from "./SongAlbum";

const SongList = ({ props, setProps, setFooterSong, setSongList }) => {
  const [page, setPage] = useState(1);
  const [songs, setSongs] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const observerRef = useRef();

  const { data, error, loading } = fetchSong(props, page);

  const handleAlbumClick = (song) => {
    console.log(song.album);
    const albumSong = fetchAlbum(song.album.id);
    return albumSong;
  }

  useEffect(() => {
    //This will Reset page and song list when props change
    setPage(1);
    setSongs([]);
    setIsFirstLoad(true);
  }, [props]);

  useEffect(() => {
    if (data?.data?.results) {
      setSongs((prevSongs) => [...prevSongs, ...data.data.results]);
      setSongList((prevSongs) => [...prevSongs, ...data.data.results]);
      setIsFirstLoad(false);
      console.log(data?.data?.results);
    }
  }, [data, setSongList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFirstLoad) {
          setPage((currPage) => currPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isFirstLoad]);

  return (
    <div className="text-white pb-28">
      <div className="flex justify-center gap-3 my-5">
        <div>
          <label htmlFor="language" className="px-5">
            Music language:
          </label>
          <select
            className="bg-primary-body border-transparent text-white selection:border-transparent"
            id="language"
            value={props}
            onChange={(e) => setProps(e.target.value)}
          >
            {languages.map((language, index) => (
              <option
                className="bg-primary-body text-white focus:border-transparent sele"
                key={index}
                value={language}
              >
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="my-5 mx-2 sm:mx-12">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {songs.map((song, index) => (
            <div
              key={`${song.id}-${index}`}
              className="flex flex-col items-center"
            >
              <div>
                <div className="relative group">
                  <img
                    src={song.image[2].link}
                    alt={`${song.name} album cover`}
                    className="object-fill rounded-md size-40 sm:size-52 md:size-60 lg:size-72"
                    onClick={() => {
                      SongAlbum(song.album.id)
                    }}
                  />
                  <div className="absolute size-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <FontAwesomeIcon
                      className="text-white size-20"
                      icon={faCirclePlay}
                      onClick={() => setFooterSong(song, index)}
                    />
                  </div>
                </div>
                <p>{useNameFormatter(song.name)}</p>
                <p >{song.year}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default SongList;
