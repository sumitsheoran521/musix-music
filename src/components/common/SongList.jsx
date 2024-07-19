import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import fetchSong from "../../api/fetchSongs";
import useNameFormatter from "../../hooks/useNameFormatter";
import { languages } from "../../services/languages";

const SongList = ({ props, setProps, setFooterSong, setSongList }) => {
  const [page, setPage] = useState(1);
  const { data, error, loading } = fetchSong(props, page);

  useEffect(() => {
    setPage(1);
  }, [props]);

  useEffect(() => {
    if (data?.data?.results) {
      setSongList(data.data.results);
    }
  }, [data, setSongList]);

  const nextPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage((currPage) => currPage + 1);
  };

  const prevPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage((currPage) => (currPage === 1 ? currPage : currPage - 1));
  };

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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 hover:cursor-pointer">
          {data?.data?.results.map((song, index) => (
            <div
              key={song.id}
              className="flex flex-col items-center"
              onClick={() => setFooterSong(song, index)}
            >
              <img
                src={song.image[2].link}
                alt={`${song.name} album cover`}
                className="object-fill rounded-md h-40 w-40 sm:h-52 sm:w-52 md:h-60 md:w-60 lg:h-72 lg:w-72"
              />
              <p>{useNameFormatter(song.name)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-3 gap-4">
        <button
          onClick={prevPage}
          className="border-2 rounded-full border-white"
        >
          <div className="flex justify-center items-center px-1">
            <FontAwesomeIcon icon={faArrowLeft} className="p-1" />
            <p className="p-2">Previous</p>
          </div>
        </button>
        <button
          onClick={data?.data?.results.length >= 40 ? nextPage : null}
          className="border-2 rounded-full border-white"
        >
          <div className="flex justify-center items-center px-1">
            <p className="p-2">Next</p>
            <FontAwesomeIcon icon={faArrowRight} className="p-1" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SongList;
