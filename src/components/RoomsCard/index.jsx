import React from "react";
import classes from "./styles.module.css";

const RoomsCard = ({ id, index, name, floor, building, onClick }) => {
  return (
    <div
      role="option"
      aria-selected="true"
      tabIndex={index}
      className={classes.roomsCard}
      onKeyDown={(event) => {
        if (event.keycode === 13) onClick(id);
      }}
      onClick={() => onClick(id)}
    >
      <section className={classes.roomsCardContent}>
        <h4>{name}</h4>
        <span>Name</span>
      </section>
      <section className={classes.roomsCardContent}>
        <h4>{floor}</h4>
        <span>Floor</span>
      </section>
      <section className={classes.roomsCardContent}>
        <h4>{building.name}</h4>
        <span>Building</span>
      </section>
    </div>
  );
};

export default RoomsCard;
