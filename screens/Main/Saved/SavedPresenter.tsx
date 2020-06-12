import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  margin-top: 80px;
  padding: 0 30px;
`;

const ScrollView = styled.ScrollView``;

const Title = styled.Text`
  font-size: 36px;
`;

const Text = styled.Text``;

export default () => (
  <Container>
    <ScrollView>
      <Title>Saved</Title>
    </ScrollView>
  </Container>
);
