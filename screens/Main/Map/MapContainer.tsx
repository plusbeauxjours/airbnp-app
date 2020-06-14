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
  const moveMap = () => {
    mapRef.current?.animateCamera(
      {
        center: {
          latitude: parseFloat(rooms[currentIndex].lat),
          longitude: parseFloat(rooms[currentIndex].lng),
        },
      },
      { duration: 1000 }
    );
  };
  useEffect(() => {
    if (currentIndex !== 0) {
      moveMap();
    }
  }, [currentIndex]);
  const onRegionChangeComplete = async () => {
    try {
      const { northEast, southWest } = await mapRef.current?.getMapBoundaries();
      console.log(northEast, southWest);
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <MapPresenter
      currentIndex={currentIndex}
      mapRef={mapRef}
      rooms={rooms}
      onScroll={onScroll}
      onRegionChangeComplete={onRegionChangeComplete}
    />
  );
};
