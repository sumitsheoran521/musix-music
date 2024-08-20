import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import useFetch from "../../hooks/useFetch";

const SongAlbum = () => {
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState(null);
  const { data, error, loading } = useFetch(
    `https://saavn.dev/api/albums?id=${albumId}`
  );

  useEffect(() => {
    if (data) {
      setAlbumData(data);
    }
  }, [data]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-white">
      <Navbar />
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {albumData && (
            <div>
              <h2>Album Name: {albumData.data.name}</h2>
              {albumData.data.songs.map((song, index) => (
                <p key={index}>{song.name}</p>
              ))}
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
};

export default SongAlbum;
