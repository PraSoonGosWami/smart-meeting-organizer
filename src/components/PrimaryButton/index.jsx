import React from "react";
import classes from "./styles.module.css";

const PrimaryButton = ({ children, ...buttonProps }) => {
  return (
    <button className={classes.primaryButton} {...buttonProps}>
      {children}
    </button>
  );
};

export default React.memo(PrimaryButton);
