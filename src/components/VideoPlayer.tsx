import './../style/VideoPlayer.scss';


const VideoPlayer = (props: { fileName: string }) => {
  return (
    <div>
      <video height={1000} width={1200} controls>
        <source src={`${process.env.REACT_APP_API}/series/video/${props.fileName}`} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
