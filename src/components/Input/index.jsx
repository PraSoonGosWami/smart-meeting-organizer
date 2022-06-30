import React from "react";
import classes from "./styles.module.css";

const Input = ({ label, id, type, children, ...restInputProps }) => {
  return (
    <div className={classes.inputContainer}>
      <label className={classes.inputLabel} htmlFor={id}>
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          style={{
            backgroundImage: `url("/assets/drop-down.png")`,
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "right",
            backgroundPositionY: "center",
            paddingRight: "16px",
            backgroundOrigin: "content-box",
          }}
          className={classes.input}
          {...restInputProps}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          className={classes.input}
          {...restInputProps}
        />
      )}
    </div>
  );
};

export default React.memo(Input);
