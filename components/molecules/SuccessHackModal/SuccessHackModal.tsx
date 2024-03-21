import React, { FC } from "react";
import { Modal } from "@mui/material";

import styles from "./SuccessHackModal.module.scss";
import classNames from "classnames";
import { SuccessVideoHack } from "@/components";

interface ISuccessHackModal {
  matchedSequences: {
    img: React.JSX.Element;
    message: string;
    sequence: string[];
  }[];
}

export const SuccessHackModal: FC<ISuccessHackModal> = (props) => {
  const { matchedSequences } = props;
  return (
    <>
      <Modal open>
        <div className={styles.hackModalContainer}>
          <div className={styles.hackModalTypes}>
            {matchedSequences.map((item) => {
              return (
                <p key={item.message} className={styles.hackModalText}>
                  {item.message} {item.img}
                </p>
              );
            })}
          </div>
        </div>
      </Modal>
      <SuccessVideoHack />
    </>
  );
};
