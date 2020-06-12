import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    explore: {
      page: 1,
      rooms: [],
    },
    favs: [],
  },
  reducers: {
    setExploreRooms(state, action) {
      if (action.payload.page === 1) {
        state.explore.rooms = action.payload.rooms;
        state.explore.page = 1;
      } else {
        state.explore.rooms = [...state.explore.rooms, ...action.payload.rooms];
      }
    },
    increasePage(state, action) {
      state.explore.page += 1;
    },
    setFavs(state, action) {
      state.favs = action.payload;
    },
    setFav(state, action) {
      const room = state.explore.rooms.find(
        (room) => room.uuid === action.payload.roomUuid
      );
      if (room) {
        if (room.is_fav) {
          room.is_fav = false;
          state.favs = state.favs.filter(
            (room) => room.uuid !== action.payload.roomUuid
          );
        } else {
          room.is_fav = true;
          state.favs.push(room);
        }
      }
    },
  },
});

export const {
  setExploreRooms,
  increasePage,
  setFavs,
  setFav,
} = roomsSlice.actions;

export const getRooms = (page: number) => async (dispatch) => {
  try {
    const {
      data: { results },
    } = await api.rooms(page);
    dispatch(
      setExploreRooms({
        rooms: results,
        page,
      })
    );
  } catch (e) {
    console.warn(e);
  }
};

export default roomsSlice.reducer;
