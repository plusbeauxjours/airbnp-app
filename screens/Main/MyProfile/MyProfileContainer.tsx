import React, { useEffect, useState } from "react";
import MyProfilePresenter from "./MyProfilePresenter";
import { useNavigation } from "@react-navigation/native";
import api from "../../../api";

function formatQty(number: number, name: string) {
  if (number === 1) {
    return `${number} ${name}`;
  } else {
    return `${number} ${name}s`;
  }
}

interface IProps {
  token: string;
  me: any;
  userLogout: () => void;
}

const MyProfileContainer: React.FC<IProps> = ({ me, token, userLogout }) => {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState<any>([]);
  const [roomLoading, setRoomsLoading] = useState<boolean>(false);
  const triggerRooms = async () => {
    setRoomsLoading(true);
    try {
      const { data } = await api.userRooms(me.uuid, token);
      setRooms(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setRoomsLoading(false);
    }
  };
  useEffect(() => {
    triggerRooms();
    navigation.setOptions({ title: me.username });
  }, []);

  return (
    <MyProfilePresenter
      userLogout={userLogout}
      formatQty={formatQty}
      me={me}
      roomLoading={roomLoading}
      rooms={rooms}
    />
  );
};

export default MyProfileContainer;
