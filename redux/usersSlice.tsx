import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
    me: null,
    users: [],
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
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
      dispatch(logIn({ token }));
      const { data } = await api.user(uuid);
      if (data) {
        dispatch(setMe({ data }));
      }
    }
  } catch (e) {
    alert("Wrong user/password");
  }
};
// export const getUser = (uuid: string) => async (dispatch) => {
//   try {
//     const {
//       data: { results },
//     } = await api.user(uuid);
//     dispatch(
//       setUser({
//         results,
//       })
//     );
//   } catch (e) {
//     console.warn(e);
//   }
// };

export default usersSlice.reducer;
