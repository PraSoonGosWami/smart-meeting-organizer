import { createSlice } from "@reduxjs/toolkit";
import { getData } from "./action.creators";

const initialState = {
  buildings: [],
  meetingRooms: [],
  isLoading: true,
  error: null,
};

const masterSlice = createSlice({
  name: "master",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.buildings = action.payload.buildings;
      state.meetingRooms = action.payload.meetingRooms;
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { fetchData } = masterSlice.actions;
export default masterSlice.reducer;
