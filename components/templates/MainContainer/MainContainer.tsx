import { FC, PropsWithChildren } from "react";

import styles from "./MainContainer.module.scss";

export const MainContainer: FC<PropsWithChildren> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};
