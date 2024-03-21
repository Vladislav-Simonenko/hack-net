"use client";
import React, { FC } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { HackedModal } from "@/components";

import styles from "./Timer.module.scss";
import classNames from "classnames";

interface ITimerProps {
  endDate: number;
  matchedSequences: boolean;
  timeOver: boolean;
  fullBuffer: boolean;
}

export const Timer: FC<ITimerProps> = (props) => {
  const { endDate, matchedSequences, timeOver, fullBuffer } = props;
  const Completionist = () => <HackedModal />;

  const renderer = ({
    seconds,
    milliseconds,
    completed,
  }: CountdownRenderProps) => {
    if (timeOver && matchedSequences) {
      return <Completionist />;
    } else if (matchedSequences && fullBuffer) {
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
