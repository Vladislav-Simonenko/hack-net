import React, { FC } from "react";

import styles from "./VideoLoader.module.scss";

export const VideoLoader: FC = () => {
  return (
    <video
      className={styles.videoLoaderContainer}
      preload="none"
      autoPlay
      muted
      width={100}
      height={100}
    >
      <source src="./video/loaderVideo.mp4" type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>
  );
};
