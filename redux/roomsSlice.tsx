import { createSlice } from "@reduxjs/toolkit";

interface IExplore {
  page: number;
  rooms: any;
}
interface IState {
  explore: IExplore;
  favs: any;
}
const initialState: IState = {
  explore: {
    page: 1,
    rooms: [],
  },
  favs: [],
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setExploreRooms(state, action) {
      state.explore.rooms.push(action.payload.rooms);
      state.explore.page = action.payload.page;
    },
  },
});

export const { setExploreRooms } = roomsSlice.actions;

export default roomsSlice.reducer;
