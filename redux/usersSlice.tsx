import { createSlice } from "@reduxjs/toolkit";

interface IState {
  isLoggedIn: boolean;
  token: string;
}
const initialState: IState = { isLoggedIn: false, token: null };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logIn(state, action) {
      console.log("state", state, "action", action);
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logOut(state, action) {
      console.log("state", state, "action", action);
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
