"use client";
import React, { FC, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { HackedModal } from "@/components";

import styles from "./Timer.module.scss";
import classNames from "classnames";

interface ITimerProps {
  endDate: number;
}

export const Timer: FC<ITimerProps> = (props) => {
  const { endDate } = props;
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
      date={endDate}
    />
  );
};
