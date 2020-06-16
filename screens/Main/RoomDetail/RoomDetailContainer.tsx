import React, { useEffect, useState } from "react";
import RoomDetailPresener from "./RoomDetailPresener";
import utils from "../../../utils";
import api from "../../../api";
import { useNavigation } from "@react-navigation/native";

function formatQtt(number: number, name: string) {
  if (number === 1) {
    return `${number} ${name}`;
  } else {
    return `${number} ${name}s`;
  }
}

function formatTime(time) {
  const [hours, min, sec] = time.split(":");
  return `${hours} o'clock`;
}

function getIconName(isFav) {
  const isAndroid = utils.isAndroid();
  if (isAndroid) {
    if (isFav) {
      return "md-heart";
    }
    return "md-heart-empty";
  } else {
    if (isFav) {
      return "ios-heart";
    }
    return "ios-heart-empty";
  }
}

export default ({ route: { params }, favs, token, toggleFavs }) => {
  const roomObj = params;
  const navigation = useNavigation();
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any>(null);
  const [isFavState, setIsFavState] = useState<boolean>(
    favs.find((fav) => fav.uuid === params.uuid)
  );
  const triggerReview = async () => {
    setReviewLoading(true);
    try {
      const { data } = await api.reviews(roomObj.uuid, token);
      setReviews(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setReviewLoading(false);
    }
  };
  useEffect(() => {
    triggerReview();
    navigation.setOptions({ title: params.name });
  }, []);
  return (
    <RoomDetailPresener
      navigation={navigation}
      reviewLoading={reviewLoading}
      reviews={reviews}
      roomObj={roomObj}
      isFavState={isFavState}
      setIsFavState={setIsFavState}
      toggleFavs={toggleFavs}
      formatQtt={formatQtt}
      formatTime={formatTime}
      getIconName={getIconName}
    />
  );
};
