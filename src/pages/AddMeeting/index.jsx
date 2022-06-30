import { useMutation } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Input from "../../components/Input";
import Modal from "../../components/Modal";
import PrimaryButton from "../../components/PrimaryButton";
import RoomsCard from "../../components/RoomsCard";
import Spin from "../../components/Spin";
import { ADD_MEETING } from "../../Graphql/mutations";
import { getData } from "../../store/master/action.creators";
import { formatDate, generateId, getAvailableRooms } from "../../utils";
import classes from "./styles.module.css";

const AddMeeting = () => {
  const { buildings, meetingRooms } = useSelector((state) => state.master);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    buildingId: "",
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [addMeeting, { loading }] = useMutation(ADD_MEETING);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onInputChange = useCallback((e) => {
    let { name, value } = e.target;
    if (!name) return;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const getAvailability = (e) => {
    e.preventDefault();
    const data = { ...formData };
    if (!data.buildingId) data.buildingId = buildings[0].id;
    if (
      !data.title ||
      !data.date ||
      !data.startTime ||
      !data.endTime ||
      !data.buildingId
    )
      return;
    if (data.startTime > data.endTime) {
      toast.error("Start Time cannot be greater than End Time");
      return;
    }
    data.date = formatDate(data.date);
    setAvailableRooms(getAvailableRooms(meetingRooms, data));
    setShowModal(true);
  };
  const selectRoom = (meetingRoomId) => {
    const { buildingId, date, ...rest } = formData;
    const variables = {
      ...rest,
      meetingRoomId,
      id: generateId(),
      date: formatDate(date),
    };
    addMeeting({ variables }).then(() => {
      setFormData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        buildingId: "",
      });
      closeModal();
      toast.success(`"${rest.title}" scheduled successfully`);
      dispatch(getData());
    });
  };

  return (
    <main className={classes.addMeeting}>
      <section className={classes.meetingFrom}>
        <h2>Add a New Meeting</h2>
        <form onSubmit={getAvailability}>
          <Input
            id="meeting-title"
            name="title"
            type="name"
            label="Enter Meeting Title"
            placeholder="Eg. Your aweosme meeting"
            required
            value={formData.title}
            onChange={onInputChange}
          />
          <Input
            id="meeting-date"
            name="date"
            type="date"
            min={new Date().toLocaleDateString().split("/").reverse().join("-")}
            label="Select Meeting Date"
            required
            value={formData.date}
            onChange={onInputChange}
          />
          <Input
            id="meeting-startTime"
            name="startTime"
            type="time"
            label="Select Meeting Start Time"
            max="23:59"
            required
            value={formData.startTime}
            onChange={onInputChange}
          />
          <Input
            id="meeting-endTime"
            name="endTime"
            type="time"
            label="Select Meeting End Time"
            required
            value={formData.endTime}
            onChange={onInputChange}
          />
          <Input
            id="meeting-building"
            name="buildingId"
            type="select"
            label="Select Building"
            required
            value={formData.buildingId}
            onChange={onInputChange}
          >
            {buildings?.length &&
              buildings.map((building, i) => (
                <option key={building.id + "" + i} value={building.id}>
                  {building.name}
                </option>
              ))}
          </Input>
          <PrimaryButton type="submit">Check Availability</PrimaryButton>
        </form>
      </section>
      <Modal show={showModal} title="Select Room" onClose={closeModal}>
        <section className={classes.meetingFrom}>
          {!availableRooms.length ? (
            <div className={classes.meetingError}>
              Oops! Seems like no meeting rooms are available in this building.
              Try different building or time
            </div>
          ) : (
            <div>
              {availableRooms.map((room, index) => (
                <RoomsCard
                  key={room.id}
                  index={index}
                  onClick={selectRoom}
                  {...room}
                />
              ))}
            </div>
          )}
        </section>
      </Modal>
      <Spin show={loading} />
    </main>
  );
};

export default AddMeeting;
