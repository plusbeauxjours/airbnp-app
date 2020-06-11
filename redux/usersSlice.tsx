import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logOut(state, action) {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { logIn, logOut } = usersSlice.actions;

export const userLogin = (form) => async (dispatch) => {
  try {
    const {
      data: { uuid, token },
    } = await api.login(form);
    if (uuid && token) {
      dispatch(logIn({ token }));
    }
  } catch (e) {
    alert("Wrong user/password");
  }
};

export default usersSlice.reducer;
