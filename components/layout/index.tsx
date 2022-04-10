import { PropsWithChildren, ReactNode } from "react";
import styles from "./style.module.css";

const Layout = function ({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
};

export default Layout;
