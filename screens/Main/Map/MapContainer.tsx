import React, { useState, useEffect, useRef } from "react";
import MapPresenter from "./MapPresenter";
import { Dimensions } from "react-native";
import api from "../../../api";
import { useNavigation } from "@react-navigation/native";

export default ({ token }) => {
  const mapRef = useRef();
  const navigation = useNavigation();
  const { width } = Dimensions.get("screen");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [rooms, setRooms] = useState<[]>([]);
  const onScroll = (e) => {
    const {
      nativeEvent: {
        contentOffset: { x },
      },
    } = e;
    const position = Math.abs(Math.round(x / width));
    setCurrentIndex(position);
  };
  // const moveMap = () => {
  //   mapRef.current?.animateCamera(
  //     {
  //       center: {
  //         latitude: parseFloat(rooms[currentIndex].lat),
  //         longitude: parseFloat(rooms[currentIndex].lng),
  //       },
  //     },
  //     { duration: 1000 }
  //   );
  // };
  // useEffect(() => {
  //   if (currentIndex !== 0) {
  //     moveMap();
  //   }
  // }, [currentIndex]);
  const onRegionChangeComplete = async () => {
    try {
      const { northEast, southWest } = await mapRef.current?.getMapBoundaries();
      const form = {
        ...(northEast && { north: northEast.latitude }),
        ...(northEast && { east: northEast.longitude }),
        ...(southWest && { south: southWest.latitude }),
        ...(southWest && { west: southWest.longitude }),
      };
      try {
        const {
          data: { results },
        } = await api.search(form, token);
        setRooms(results);
      } catch (e) {
        console.warn(e);
      }
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <MapPresenter
      navigation={navigation}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      mapRef={mapRef}
      rooms={rooms}
      onScroll={onScroll}
      onRegionChangeComplete={onRegionChangeComplete}
    />
  );
};
