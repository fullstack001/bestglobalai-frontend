import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ streamUrl, title }) => {
  return (
    <div className="video-player">
      <h2>{title}</h2>
      <ReactPlayer
        url={streamUrl}
        controls
        playing
        width="100%"
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous",
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
