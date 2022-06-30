import React from "react";
import { checkOnGoingMeeting } from "../../utils";
import classes from "./styles.module.css";

const MeetingsCard = ({
  title,
  date,
  startTime,
  endTime,
  name,
  floor,
  building,
}) => {
  return (
    <div title={title} className={classes.meetingsCard}>
      {checkOnGoingMeeting({ date, startTime, endTime }) && (
        <span className={classes.onGoingTag}>Ongoing</span>
      )}
      <h3>{title}</h3>
      <ul className={classes.meetingsContent}>
        <li>
          Date: <strong>{date}</strong>
        </li>
        <li>
          Start Time: <strong>{startTime}</strong>
        </li>
        <li>
          End Time: <strong>{endTime}</strong>
        </li>
        <li>
          Meetin Room: <strong>{name}</strong>
        </li>
        <li>
          Floor: <strong>{floor}</strong>
        </li>
        <li>
          Building: <strong>{building}</strong>
        </li>
      </ul>
    </div>
  );
};

export default MeetingsCard;
