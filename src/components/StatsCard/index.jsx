import React from "react";
import classes from "./styles.module.css";

const StatsCard = ({ title, stats = [] }) => {
  return (
    <div title={title} className={classes.statsCard}>
      <p>{title}</p>
      <section className={classes.stats}>
        {stats.map((item) => (
          <div key={item.key}>
            <span>{item.value}</span>
            <p>{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StatsCard;
