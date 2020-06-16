import React, { useEffect } from "react";
import UserProfilePresenter from "./UserProfilePresenter";
import { useNavigation } from "@react-navigation/native";

export default ({
  route: {
    params: { user },
  },
  users,
  getUser,
}) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: user.username });
  }, []);

  return <UserProfilePresenter user={user} />;
};
