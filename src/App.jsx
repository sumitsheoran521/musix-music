import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Login from "./pages/Login";
import SongAlbum from "./components/common/SongAlbum";
import Footer from "./components/layout/Footer";

const App = () => {
  const [footerSong, setFooterSong] = useState(null);
  const [songList, setSongList] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);

  const updateFooterSong = (song, index) => {
    setFooterSong(song);
    setCurrentSongIndex(index);
  };

  return (
    <Router>
      <div className="bg-primary-body">
        <Routes>
          <Route path="/" element={<HomePage setFooterSong={updateFooterSong} setSongList={setSongList} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/album/:albumId" element={<SongAlbum setFooterSong={updateFooterSong} setSongList={setSongList} />} />
        </Routes>
        <Footer
          footerSong={footerSong}
          songList={songList}
          currentSongIndex={currentSongIndex}
          setFooterSong={updateFooterSong}
        />
      </div>
    </Router>
  );
};

export default App;
