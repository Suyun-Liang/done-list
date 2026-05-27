import React from "react";
import styles from "./VisuallyHidden.module.css";

function VisuallyHidden({ as: Component = "span", children, ...delegated }) {
  return (
    <Component className={styles.visuallyHidden} {...delegated}>
      {children}
    </Component>
  );
}

export default VisuallyHidden;
