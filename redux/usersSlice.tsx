import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

interface IState {
  isLoggedIn: boolean;
  token: string;
}
const initialState: IState = { isLoggedIn: true, token: null };

const userSlice = createSlice({
  name: "users",
  initialState,
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

export const { logIn, logOut } = userSlice.actions;

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

export default userSlice.reducer;
