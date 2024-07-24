import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SongList from "../components/common/SongList.jsx";
import { useState } from "react";

const HomePage = () => {
  const [props, setProps] = useState("hindi");
  const [footerSong, setFooterSong] = useState(null);
  const [songList, setSongList] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  const updateFooterSong = (song, index) => {
    setFooterSong(song);
    setCurrentSongIndex(index);
  };

  return (
    <div className="bg-primary-body">
      <Navbar setProps={setProps} />
      <SongList
        props={props}
        setProps={setProps}
        setFooterSong={updateFooterSong}
        setSongList={setSongList}
      />
      <Footer
        footerSong={footerSong}
        songList={songList}
        currentSongIndex={currentSongIndex}
        setFooterSong={updateFooterSong}
      />
    </div>
  );
};

export default HomePage;
