import React, { FC } from "react";

import styles from "./HackedModal.module.scss";

export const HackedModal: FC = () => {
  return (
    <video
      className={styles.hackedModalContainer}
      preload="none"
      autoPlay
      muted
      width={100}
      height={100}
      loop
    >
      <source src="./video/infected.mp4" type="video/mp4" />
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
