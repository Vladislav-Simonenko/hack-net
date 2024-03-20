import React, { FC } from "react";

import styles from "./ActionButton.module.scss";

interface IActionButtonProps {
  text: string | number;
  onClick: () => void;
  disabled: boolean;
}

export const ActionButton: FC<IActionButtonProps> = (props) => {
  const { text, onClick, disabled } = props;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.actionButtonContainer}
    >
      {text}
    </button>
  );
};
