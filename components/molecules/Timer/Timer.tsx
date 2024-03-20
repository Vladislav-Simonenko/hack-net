"use client";

import React, { FC } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { HackedModal } from "@/components";

import styles from "./Timer.module.scss";
import classNames from "classnames";

export const Timer: FC = () => {
  const Completionist = () => <HackedModal />;

  const renderer = ({
    seconds,
    milliseconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span className={classNames(styles.timerContainer, styles.fontVariant)}>
          {seconds}.{milliseconds.toLocaleString().slice(0, -1)}
        </span>
      );
    }
  };
  return (
    <Countdown
      intervalDelay={1}
      precision={2}
      renderer={renderer}
      date={Date.now() + 60000}
    >
      <Completionist />
    </Countdown>
  );
};
