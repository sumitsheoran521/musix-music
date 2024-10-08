import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faCirclePlay,
  faCirclePause,
  faForwardStep,
  faVolumeHigh,
  faVolumeXmark,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import "../../assets/styles/footer.css";
import useNameFormatter from "../../hooks/useNameFormatter";
import useTimeFormatter from "../../hooks/useTimeFormatter";

const Footer = ({ footerSong, songList, currentSongIndex, setFooterSong }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingButton, setIsPlayingButton] = useState(false);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedKbps, setSelectedKbps] = useState("");
  const currentSong = useRef(new Audio());

  useEffect(() => {
    if (footerSong) {
      currentSong.current.src = footerSong.downloadUrl[4].link;
      currentSong.current
        .play()
        .then(() => {
          setIsPlayingButton(true);
          setIsSongPlaying(true);
        })
        .catch((error) =>
          console.error("Error occurred during playback:", error)
        );

      const updateCurrentTime = () => {
        setCurrentTime(currentSong.current.currentTime);
      };

      const handleEndedSong = () => {
        playNextSong();
        setIsPlayingButton(false);
      };

      currentSong.current.addEventListener("timeupdate", updateCurrentTime);
      currentSong.current.addEventListener("ended", handleEndedSong);

      setSelectedKbps("");

      return () => {
        currentSong.current.removeEventListener(
          "timeupdate",
          updateCurrentTime
        );
        currentSong.current.removeEventListener("ended", handleEndedSong);
      };
    }
  }, [footerSong]);

  useEffect(() => {
    const handleSpacePressed = (e) => {
      if (e.key === " " && e.target.tagName !== "INPUT") {
        e.preventDefault();
        togglePlayButton();
      }
    };

    document.addEventListener("keydown", handleSpacePressed);
    return () => {
      document.removeEventListener("keydown", handleSpacePressed);
    };
  }, [isSongPlaying]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    currentSong.current.muted = !isMuted;
  };

  const togglePlayButton = () => {
    if (isSongPlaying) {
      currentSong.current.pause();
    } else {
      currentSong.current
        .play()
        .catch((error) =>
          console.error("Error occurred during playback:", error)
        );
    }
    setIsPlayingButton(!isPlayingButton);
    setIsSongPlaying(!isSongPlaying);
  };

  const playNextSong = () => {
    const nextSongIndex = currentSongIndex + 1;
    if (nextSongIndex < songList.length) {
      setFooterSong(songList[nextSongIndex], nextSongIndex);
    }
  };

  const playPrevSong = () => {
    const prevSongIndex = currentSongIndex - 1;
    if (prevSongIndex >= 0) {
      setFooterSong(songList[prevSongIndex], prevSongIndex);
    }
  };

  const downloadSong = (kbpsIndex) => {
    if (footerSong) {
      const bitrates = ["12kbps", "48kbps", "96kbps", "160kbps", "320kbps"];
      const link = document.createElement("a");
      link.href = footerSong.downloadUrl[kbpsIndex].link;
      link.download = `${footerSong.name}_${
        bitrates[kbpsIndex]
      }.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadChange = (e) => {
    const kbpsIndex = parseInt(e.target.value, 10);
    setSelectedKbps(e.target.value);
    downloadSong(kbpsIndex);
  };

  return (
    <footer className="fixed bg-primary-nav text-gray-300 w-full items-center h-[6rem] md:h-[6rem] left-0 right-0 border-none z-50 bottom-0 p-3">
      <div>
        <input
          type="range"
          value={currentTime}
          min={0}
          max={footerSong ? footerSong.duration : 100}
          className="w-full slider"
          onChange={(e) => (currentSong.current.currentTime = e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 w-10/12 sm:w-1/3">
          <div>
            {footerSong && (
              <img
                src={footerSong.image[2].link}
                alt={`${footerSong.name} album cover`}
                className="size-12"
              />
            )}
          </div>
          <div>
            <p className="text-lg">
              {footerSong
                ? useNameFormatter(footerSong.name)
                : "No song selected"}
            </p>
            <p className="text-xs">
              {footerSong
                ? useNameFormatter(footerSong.primaryArtists)
                : "No song selected"}
            </p>
          </div>
        </div>
        <div className="w-2/12 sm:w-1/3 flex justify-center items-center">
          <ul className="flex items-center gap-1 mr-5 sm:mr-0">
            <li onClick={playPrevSong} className="hidden sm:inline-block ">
              <FontAwesomeIcon
                icon={faBackwardStep}
                className="size-9 p-2 hover:cursor-pointer"
              />
            </li>
            <li className="flex items-center justify-center">
              <FontAwesomeIcon
                icon={isPlayingButton ? faCirclePause : faCirclePlay}
                onClick={togglePlayButton}
                className="size-9 md:size-12 p-2 hover:cursor-pointer"
              />
            </li>
            <li onClick={playNextSong}>
              <FontAwesomeIcon
                icon={faForwardStep}
                className="size-9 p-2 hover:cursor-pointer"
              />
            </li>
          </ul>
        </div>
        <div className="w-0 sm:w-1/3 hidden sm:flex justify-between items-center">
          <div className="flex justify-evenly items-center w-full gap-5">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={isMuted ? faVolumeXmark : faVolumeHigh}
                onClick={toggleMute}
                className="w-4"
              />
              <input
                type="range"
                value={currentVolume}
                min={0}
                max={100}
                className="w-full"
                onChange={(e) => {
                  const volume = e.target.value;
                  setCurrentVolume(volume);
                  currentSong.current.volume = volume / 100;
                  setIsMuted(volume === 0);
                }}
              />
            </div>
            <div className="w-20 flex justify-between items-center">
              <p className="w-full">
                {useTimeFormatter(currentTime)} /{" "}
                {footerSong ? useTimeFormatter(footerSong.duration) : "0:00"}
              </p>
            </div>
            <div className="relative inline-block">
              <select
                value={selectedKbps}
                onChange={handleDownloadChange}
                className="outline-none appearance-none ml-2 bg-blue-700 text-white rounded-md px-3 py-1"
              >
                <option value="" hidden>
                  Download
                </option>
                <option value="0">12kbps</option>
                <option value="1">48kbps</option>
                <option value="2">96kbps</option>
                <option value="3">160kbps</option>
                <option value="4">320kbps</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
