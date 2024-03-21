import React, { FC } from "react";

import styles from "./SuccessVideoHack.module.scss";

export const SuccessVideoHack: FC = () => {
  return (
    <video
      className={styles.successVideoHackContainer}
      preload="none"
      autoPlay
      muted
      width={100}
      height={100}
      loop
    >
      <source src="./video/successHackEnd.mp4" type="video/mp4" />
    </video>
  );
};
