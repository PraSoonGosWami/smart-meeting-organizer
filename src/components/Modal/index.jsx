import React, { useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import PrimaryButton from "../PrimaryButton";
import classes from "./styles.module.css";

const Modal = ({ title, children, onClose, show }) => {
  useLayoutEffect(() => {
    const closeOnEsc = (e) => e.keyCode === 27 && show && onClose();
    window.addEventListener("keydown", closeOnEsc);
    show
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, [show, onClose]);

  if (!show) return null;
  return ReactDOM.createPortal(
    <div
      role="alertdialog"
      aria-labelledby={title}
      aria-modal="true"
      className={classes.modal}
    >
      <section className={classes.modalContainer}>
        {title && <h3 className={classes.modalTitle}>{title}</h3>}
        <main>{children}</main>
        <footer>
          <PrimaryButton onClick={onClose}>Edit Info</PrimaryButton>
        </footer>
      </section>
    </div>,
    document.getElementById("app-modal")
  );
};

export default React.memo(Modal, (p, c) => p.show === c.show);
