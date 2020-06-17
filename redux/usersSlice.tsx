import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { setFavs, setFav } from "./roomsSlice";
import { AsyncStorage } from "react-native";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
    me: null,
    uuid: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.uuid = action.payload.uuid;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.me = null;
      state.uuid = null;
    },
    setMe(state, action) {
      state.me = action.payload.data;
    },
  },
});

export const { logIn, logOut, setMe } = usersSlice.actions;

export const userLogin = (form: {}) => async (dispatch) => {
  try {
    const {
      data: { uuid, token },
    } = await api.login(form);
    if (uuid && token) {
      dispatch(logIn({ uuid, token }));
      const { data } = await api.user(uuid);
      if (data) {
        dispatch(setMe({ data }));
      }
    }
  } catch (e) {
    alert("Wrong user/password");
  }
};

export const appleLogin = (uuid: string, token: string) => async (dispatch) => {
  if (uuid && token) {
    dispatch(logIn({ uuid, token }));
    const { data } = await api.user(uuid);
    if (data) {
      dispatch(setMe({ data }));
    }
  }
};

export const userLogout = () => async (dispatch) => {
  console.log("logout");
  AsyncStorage.clear();
  dispatch(logOut());
};

export const getFavs = () => async (dispatch, getState) => {
  const {
    usersReducer: { uuid, token },
  } = getState();
  try {
    const { data } = await api.favs(uuid, token);
    dispatch(setFavs(data));
  } catch (e) {
    console.warn(e);
  }
};

export const toggleFavs = (roomUuid: string, roomObj: {}) => async (
  dispatch,
  getState
) => {
  const {
    usersReducer: { uuid, token },
  } = getState();
  dispatch(setFav({ roomUuid, roomObj }));
  try {
    await api.toggleFavs(uuid, roomUuid, token);
  } catch (e) {
    console.warn(e);
  }
};

export const getUserRooms = (uuid: string) => async (getState) => {
  const {
    usersReducer: { token },
  } = getState();
  try {
    return api.userRooms(uuid, token);
  } catch (e) {
    console.warn(e);
  }
};
export const getUserReview = (uuid: string) => async (getState) => {
  const {
    usersReducer: { token },
  } = getState();
  try {
    await api.userReviews(uuid, token);
  } catch (e) {
    console.warn(e);
  }
};

export default usersSlice.reducer;
