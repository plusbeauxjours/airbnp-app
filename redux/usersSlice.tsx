import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { setFavs, setFav } from "./roomsSlice";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
    me: null,
    users: [],
    uuid: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.uuid = action.payload.uuid;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
      state.me = null;
      state.users = [];
    },
    setMe(state, action) {
      state.me = action.payload.data;
    },
    setUser(state, action) {
      action.payload.rooms.forEach((payloadUser) => {
        const exists = state.users.find(
          (savedUser) => savedUser.uuid === payloadUser.uuid
        );
        if (!exists) {
          state.users.push(payloadUser);
        }
      });
    },
  },
});

export const { logIn, logOut, setMe, setUser } = usersSlice.actions;

export const userLogin = (form) => async (dispatch) => {
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

export const getMe = () => async (dispatch, getState) => {
  const {
    usersReducer: { uuid },
  } = getState();
  try {
    const { data } = await api.user(uuid);
    dispatch(setMe({ data }));
  } catch (e) {
    console.warn(e);
  }
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

export const toggleFavs = (roomUuid) => async (dispatch, getState) => {
  const {
    usersReducer: { uuid, token },
  } = getState();
  dispatch(setFav({ roomUuid }));
  try {
    const { status } = await api.toggleFavs(uuid, roomUuid, token);
  } catch (e) {
    console.warn(e);
  }
};

// export const getUser = (uuid: string) => async (dispatch, getState) => {
//   const {
//     usersReducer: { uuid },
//   } = getState();
//   try {
//     const { data } = await api.user(uuid);
//     dispatch(setMe({ data }));
//   } catch (e) {
//     console.warn(e);
//   }
// };

export default usersSlice.reducer;
