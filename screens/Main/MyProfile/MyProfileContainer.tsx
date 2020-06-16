import React, { useEffect, useState } from "react";
import MyProfilePresenter from "./MyProfilePresenter";
import { useNavigation } from "@react-navigation/native";
import api from "../../../api";

interface IProps {
  uuid: string;
  me: any;
}

const MyProfileContainer: React.FC<IProps> = ({ me, token }) => {
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

  return <MyProfilePresenter me={me} roomLoading={roomLoading} rooms={rooms} />;
};

export default MyProfileContainer;
