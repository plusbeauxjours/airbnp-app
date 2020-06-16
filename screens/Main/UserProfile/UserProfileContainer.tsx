import React, { useEffect, useState } from "react";
import UserProfilePresenter from "./UserProfilePresenter";
import { useNavigation } from "@react-navigation/native";
import api from "../../../api";

export default ({
  route: {
    params: { user },
  },
  token,
}) => {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState<any>([]);
  const [roomLoading, setRoomsLoading] = useState<boolean>(false);
  const triggerRooms = async () => {
    setRoomsLoading(true);
    try {
      const { data } = await api.userRooms(user.uuid, token);
      setRooms(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setRoomsLoading(false);
    }
  };
  useEffect(() => {
    triggerRooms();
    navigation.setOptions({ title: user.username });
  }, [user]);

  return (
    <UserProfilePresenter roomLoading={roomLoading} user={user} rooms={rooms} />
  );
};
