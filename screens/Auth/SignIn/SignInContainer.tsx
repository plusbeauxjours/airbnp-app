import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/usersSlice";
import utils from "../../../utils";
import SignInpresenter from "./SignInPresenter";

export default ({ route: { params } }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>(params?.email);
  const [password, setPassword] = useState<string>(params?.password);
  const isFormValid = () => {
    if (email === "" || password === "") {
      alert("All fields are required.");
      return false;
    }
    if (!utils.isEmail(email)) {
      alert("Email is invalid");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (!isFormValid()) {
      return;
    }
    dispatch(
      userLogin({
        username: email,
        password,
      })
    );
  };
  return (
    <SignInpresenter
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
