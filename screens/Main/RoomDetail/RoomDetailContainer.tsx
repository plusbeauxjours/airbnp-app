import React, { useEffect, useState } from "react";
import RoomDetailPresener from "./RoomDetailPresener";
import utils from "../../../utils";

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
export default ({ route: { params }, navigation, favs, toggleFavs }) => {
  const roomObj = params;
  const [isFavState, setIsFavState] = useState<boolean>(
    favs.find((fav) => fav.uuid === params.uuid)
  );
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);
  return (
    <RoomDetailPresener
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
