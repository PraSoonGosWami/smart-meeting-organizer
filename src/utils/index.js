function convertDateToTimestamp(date, time) {
  return new Date(`${date} ${time}`);
}
function compareMeetingTime(obj1, obj2) {
  const startTime1 = convertDateToTimestamp(obj1.date, obj1.startTime);
  const startTime2 = convertDateToTimestamp(obj2.date, obj2.startTime);
  return startTime2 - startTime1;
}
function checkTodaysMeeting(meetingObj) {
  const currentDate = new Date().toDateString(),
    meetingDate = new Date(meetingObj.date).toDateString();

  return currentDate === meetingDate;
}

function checkRoomAvailability(newMeeting, meetingObj) {
  const startTime = convertDateToTimestamp(
      meetingObj.date,
      meetingObj.startTime
    ),
    endTime = convertDateToTimestamp(meetingObj.date, meetingObj.endTime),
    newMeetingStartTime = convertDateToTimestamp(
      newMeeting.date,
      newMeeting.startTime
    ),
    newMeetingEndTime = convertDateToTimestamp(
      newMeeting.date,
      newMeeting.endTime
    );

  if (
    (newMeetingStartTime >= startTime && newMeetingStartTime <= endTime) ||
    (startTime >= newMeetingStartTime && startTime <= newMeetingEndTime)
  ) {
    return false;
  }

  return true;
}

export function generateId() {
  return Math.floor(Math.random() * 1000);
}

export function formatDate(date = "") {
  const arr = date.split("-");
  return `${arr[1]}/${arr[2]}/${arr[0]}`;
}

export function checkOnGoingMeeting(meetingObj) {
  const currentTime = new Date().getTime(),
    startTime = convertDateToTimestamp(meetingObj.date, meetingObj.startTime),
    endTime = convertDateToTimestamp(meetingObj.date, meetingObj.endTime);

  if (currentTime >= startTime && currentTime <= endTime) {
    return true;
  } else {
    return false;
  }
}

export function getStats(meetingRooms = []) {
  const freeRooms = [];
  const onGoingMeetings = [];
  const todayMeetings = [];
  const allMeetings = [];
  meetingRooms.forEach((room) => {
    if (!room.meetings || !room.meetings.length) freeRooms.push(room);
    else {
      let isAvailable = true;
      room.meetings.forEach((meeting) => {
        //check on going meetings
        if (checkOnGoingMeeting(meeting)) {
          onGoingMeetings.push(meeting);
          todayMeetings.push(meeting);
          isAvailable = false;
        } else if (checkTodaysMeeting(meeting)) todayMeetings.push(meeting);
        allMeetings.push({
          ...meeting,
          name: room.name,
          floor: room.floor,
          building: room.building.name,
        });
      });
      if (isAvailable) freeRooms.push(room);
    }
  });

  allMeetings.sort(compareMeetingTime);
  return { freeRooms, onGoingMeetings, todayMeetings, allMeetings };
}

export function getAvailableRooms(meetingRooms = [], newMeeting) {
  if (!newMeeting) return;
  const freeRooms = [];
  meetingRooms
    .filter((room) => room.building.id === parseInt(newMeeting.buildingId))
    .forEach((room) => {
      if (!room.meetings || !room.meetings.length) freeRooms.push(room);
      else {
        let isAvailable = true;
        room.meetings.forEach((meeting) => {
          //check on if any meeting already scheduled on thr given time
          if (!checkRoomAvailability(newMeeting, meeting)) {
            isAvailable = false;
          }
        });
        if (isAvailable) freeRooms.push(room);
      }
    });
  return freeRooms;
}
