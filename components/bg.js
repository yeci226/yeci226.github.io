import React from "react";

const BackgroundVideo = () => {
  return (
    <div style={{ position: "fixed", width: "100%", height: "100%", zIndex: -1 }}>

      <video autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover" }}>
        <source src="/bg.webm" type="video/webm" />
      </video>
    
    </div>
  );
};

export default BackgroundVideo;
