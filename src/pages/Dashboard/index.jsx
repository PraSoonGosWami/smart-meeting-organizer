import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StatsCard from "../../components/StatsCard";
import PrimaryButton from "../../components/PrimaryButton";
import MeetingsCard from "../../components/MeetingsCard";
import { getStats } from "../../utils";
import classes from "./styles.module.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { buildings, meetingRooms } = useSelector((state) => state.master);

  const { freeRooms, onGoingMeetings, todayMeetings, allMeetings } = useMemo(
    () => getStats(meetingRooms),
    [meetingRooms]
  );

  const handleAddMeetingClick = () => {
    navigate("add-meeting");
  };

  return (
    <main className={classes.dashboard}>
      <section className={classes.addButtonContainer}>
        <PrimaryButton onClick={handleAddMeetingClick}>
          Add New Meeting
        </PrimaryButton>
      </section>
      <article>
        <h2>Status as of today</h2>
        <section className={classes.meetingStatsContainer}>
          <StatsCard
            title="Buildings"
            stats={[
              { key: "B1", value: buildings.length || 0, text: "Total Count" },
            ]}
          />
          <StatsCard
            title="Rooms"
            stats={[
              { key: "R1", value: meetingRooms.length || 0, text: "Total" },
              { key: "R2", value: freeRooms.length || 0, text: "Free (Now)" },
            ]}
          />
          <StatsCard
            title="Meetings (Today)"
            stats={[
              { key: "M1", value: todayMeetings.length || 0, text: "Total" },
              {
                key: "M2",
                value: onGoingMeetings.length || 0,
                text: "Ongoing",
              },
            ]}
          />
        </section>
      </article>
      <article>
        <h2>Meetings</h2>
        <section className={classes.meetingContainer}>
          {allMeetings?.length > 0 &&
            allMeetings.map((item) => <MeetingsCard key={item.id} {...item} />)}
        </section>
      </article>
    </main>
  );
};

export default Dashboard;
