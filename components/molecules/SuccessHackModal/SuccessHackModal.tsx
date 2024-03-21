import React, { FC } from "react";
import { Modal } from "@mui/material";

import styles from "./SuccessHackModal.module.scss";
import classNames from "classnames";
import { SuccessVideoHack } from "@/components";

interface ISuccessHackModal {
  matchedSequences: { message: string; sequence: string[] }[];
}

export const SuccessHackModal: FC<ISuccessHackModal> = (props) => {
  const { matchedSequences } = props;
  return (
    <>
      <Modal open>
        <div className={styles.hackModalContainer}>
          <p className={classNames(styles.hackModalAccess, styles.rainbowText)}>
            Access granted
          </p>
          <div className={styles.hackModalTypes}>
            {matchedSequences.map((item) => {
              return <p key={item.message}>{item.message}</p>;
            })}
          </div>
        </div>
      </Modal>
      <SuccessVideoHack />
    </>
  );
};
