import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import utils from "../../utils";

const Container = styled.View`
  padding-left: 20px;
`;

const BackBtn: React.FC = () => (
  <Container>
    <Ionicons
      name={utils.isAndroid ? "md-arrow-down" : "ios-arrow-down"}
      size={28}
    />
  </Container>
);

export default BackBtn;
