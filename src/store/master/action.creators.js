import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../Graphql/config";
import { GET_BUILDINGS, GET_MEETING_ROOMS } from "../../Graphql/queries";

export const getData = createAsyncThunk(
  "master/getData",
  async (req, thunkAPI) => {
    try {
      let buildings = [];
      let meetingRooms = [];
      const {
        data: { Buildings },
      } = await client.query({ query: GET_BUILDINGS });
      if (Buildings) buildings = Buildings;
      const {
        data: { MeetingRooms },
      } = await client.query({
        query: GET_MEETING_ROOMS,
        fetchPolicy: "no-cache",
      });
      if (MeetingRooms) meetingRooms = MeetingRooms;

      return { buildings, meetingRooms };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
