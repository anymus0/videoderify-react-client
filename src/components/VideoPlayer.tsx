import "./../style/VideoPlayer.scss";
import { useEffect } from 'react'

const VideoPlayer = (props: { fileName: string }) => {
  const setVideoSrc = (src: string) => {
    const videoEl: HTMLVideoElement = document.querySelector("#videoPlayer");
    videoEl.src = src;
    videoEl.load();
  }

  useEffect(() => {
    const videoSrcUrl = `${process.env.REACT_APP_API}/series/video/${props.fileName}`;
    setVideoSrc(videoSrcUrl);
  })

  return (
    <div>
      <video controls preload="auto" id="videoPlayer">
        <source
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoPlayer;
