import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import api from "../api";
import { useSelector } from "react-redux";
import ReviewBox from "./ReviewBox";
import styled from "styled-components/native";

const LoadingContainer = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
`;

export default ({ uuid }) => {
  const { token } = useSelector((state: any) => state.usersReducer);
  const [reviews, setReviews] = useState<any>([]);
  const [reviewLoading, setReviewsLoading] = useState<boolean>(false);
  const triggerReviews = async () => {
    setReviewsLoading(true);
    try {
      const { data } = await api.roomReviews(uuid, token);
      setReviews(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setReviewsLoading(false);
    }
  };
  useEffect(() => {
    triggerReviews();
  }, [uuid]);
  return (
    <>
      {reviewLoading ? (
        <LoadingContainer>
          <ActivityIndicator />
        </LoadingContainer>
      ) : (
        reviews &&
        reviews.length !== 0 &&
        reviews.map((review, index) => (
          <ReviewBox key={index} review={review} />
        ))
      )}
    </>
  );
};
