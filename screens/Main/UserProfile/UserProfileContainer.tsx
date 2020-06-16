import React, { useEffect, useState } from "react";
import UserProfilePresenter from "./UserProfilePresenter";
import { useNavigation } from "@react-navigation/native";
import { getUserRooms, getUserReview } from "../../../redux/usersSlice";
import api from "../../../api";

export default ({
  route: {
    params: { user },
  },
  token,
}) => {
  const navigation = useNavigation();
  const [rooms, setRooms] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const triggerRooms = async () => {
    setLoading(true);
    try {
      const { data } = await api.getUserRooms(user.uuid, token);
      setRooms(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };
  const triggerReviews = async () => {
    setLoading(true);
    try {
      const { data } = await api.getUserReview(user.uuid, token);
      setReviews(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    triggerRooms();
    triggerReviews();
    navigation.setOptions({ title: user.username });
  }, []);

  return <UserProfilePresenter user={user} rooms={rooms} reviews={reviews} />;
};
