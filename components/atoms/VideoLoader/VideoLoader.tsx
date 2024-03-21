import React, { FC } from "react";
import { Modal } from "@mui/material";

import styles from "./VideoLoader.module.scss";

interface IVideoLoaderProps {
  open: boolean;
}

export const VideoLoader: FC<IVideoLoaderProps> = (props) => {
  const { open } = props;
  return (
    <Modal open={open}>
      <video
        className={styles.videoLoaderContainer}
        preload="none"
        autoPlay
        muted
        width={100}
        height={100}
      >
        <source src="./video/loaderVideo.mp4" type="video/mp4" />
      </video>
    </Modal>
  );
};
