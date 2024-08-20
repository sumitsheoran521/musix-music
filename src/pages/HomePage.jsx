import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import SongList from "../components/common/SongList";

const HomePage = ({ setFooterSong, setSongList }) => {
  const [props, setProps] = useState("hindi");

  return (
    <div>
      <Navbar setProps={setProps} />
      <SongList
        props={props}
        setProps={setProps}
        setFooterSong={setFooterSong}
        setSongList={setSongList}
      />
    </div>
  );
};

export default HomePage;
