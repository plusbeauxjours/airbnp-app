import React, { useState, useEffect, useRef } from "react";
import MapPresenter from "./MapPresenter";
import { Dimensions } from "react-native";

export default ({ rooms }) => {
  const mapRef = useRef();
  const { width } = Dimensions.get("screen");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const onScroll = (e) => {
    const {
      nativeEvent: {
        contentOffset: { x },
      },
    } = e;
    const position = Math.abs(Math.round(x / width));
    setCurrentIndex(position);
  };
  useEffect(() => {
    if (currentIndex !== 0) {
      mapRef.current?.animateCamera(
        {
          center: {
            latitude: parseFloat(rooms[currentIndex].lat),
            longitude: parseFloat(rooms[currentIndex].lng),
          },
        },
        { duration: 3000 }
      );
    }
  }, [currentIndex]);
  return <MapPresenter mapRef={mapRef} rooms={rooms} onScroll={onScroll} />;
};
