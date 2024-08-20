import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { fetchAlbumData } from "../../api/allAPIs"; // Import the function
import useTimeFormatter from "../../hooks/useTimeFormatter";

const SongAlbum = () => {
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const { data, error, loading } = fetchAlbumData(albumId);

  useEffect(() => {
    if (data) {
      setAlbumData(data);
    }
  }, [data]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-white bg-primary-body min-h-screen flex flex-col pb-28">
      <Navbar />
      {loading ? (
        <p className="flex-1">Loading</p>
      ) : (
        albumData && (
          <div className="flex-1">
            <div className="flex justify-center items-center p-2 lg:p-10">
              <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8">
                {console.log(albumData)}
                <div>
                  <img
                    className="size-52 md:size-56 lg:size-80 rounded-lg"
                    src={albumData.data.image[2].url}
                    alt={albumData.data.name}
                  />
                </div>
                <div className="flex justify-center flex-col">
                  <div>
                    <p className="text-4xl font-semibold">
                      {albumData.data.name}
                    </p>
                  </div>
                  <div className="pt-5">
                    <p>
                      <span>By: {albumData.data.artists.primary[0].name}</span>
                    </p>
                    <p>
                      {albumData.data.songCount}{" "}
                      {albumData.data.songCount > 1 ? "Songs" : "Song"}
                    </p>
                    <p>{albumData.data.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 overflow-auto">
              <div>
                {albumData.data.songs.map((song, index) => (
                  <div
                    key={song.id}
                    className="flex py-3 gap-5 items-center hover:bg-gray-800 hover:cursor-pointer"
                  >
                    <div className="w-1/12">{index + 1}. </div>
                    <div className="w-1/4">{song.name}</div>
                    <div className="w-1/2">
                      {song.artists.primary.map((artist, idx) => (
                        <span key={artist.id}>
                          {artist.name}
                          {idx < song.artists.primary.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                    <div>{useTimeFormatter(song.duration)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
      <Footer />
    </div>
  );
};

export default SongAlbum;

// song playable file is song.downloadUrl[4]
