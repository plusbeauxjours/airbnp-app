import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SignUpPresenter from "./SignUpPresenter";
import utils from "../../../utils";
import { userLogin } from "../../../redux/usersSlice";
import api from "../../../api";

export default () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const isFormValid = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      alert("All fields are required.");
      return false;
    }
    if (!utils.isEmail(email)) {
      alert("Please add a valid email.");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }
    setLoading(true);
    try {
      const { status } = await api.createAccount({
        first_name: firstName,
        last_name: lastName,
        email,
        username: email,
        password,
      });
      if (status === 201) {
        alert(`Account created. Welcome ${firstName}`);
        dispatch(
          userLogin({
            username: email,
            password,
          })
        );
      }
    } catch (e) {
      alert("The email is taken");
    } finally {
      setLoading(false);
    }
  };
  return (
    <SignUpPresenter
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};
