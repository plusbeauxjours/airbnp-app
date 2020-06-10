import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/usersSlice";

import ExplorePresenter from "./ExplorePresenter";

export default () => {
  const dispatch = useDispatch();
  return <ExplorePresenter dispatch={dispatch} logOut={logOut} />;
};
