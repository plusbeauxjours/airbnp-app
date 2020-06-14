import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import DismissKeyboard from "../../../components/DismissKeyboard";
import RoomCard from "../../../components/RoomCard";
import colors from "../../../colors";

const Container = styled.View`
  padding: 0px;
`;

const SearchContainer = styled.View`
  margin-top: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const SearchBar = styled.TextInput`
  height: 40px;
  width: 80%;
  background-color: white;
  box-shadow: 1px 5px 5px rgba(200, 200, 200, 0.5);
  border-radius: 7px;
  justify-content: center;
  padding-left: 10px;
`;

const CancelContainer = styled.TouchableOpacity``;

const CancelText = styled.Text``;

const FiltersContainer = styled.ScrollView`
  flex-direction: row;
  margin-top: 10px;
`;

const FilterContainer = styled.View`
  align-items: center;
  margin-right: 15px;
`;

const FilterLabel = styled.Text`
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Filter = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 1px 2.5px 2.5px rgba(200, 200, 200, 0.5);
  width: 80px;
`;

const SearchBtn = styled.TouchableOpacity`
  background-color: ${colors.red};
  padding: 10px;
  margin: 10px 30px;
  border-radius: 10px;
  align-items: center;
`;

const SearchText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const ResultsText = styled.Text`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const ScrollView = styled.ScrollView``;

interface IProps {
  loading: boolean;
  navigation: any;
  search: string;
  setSearch: (search: string) => void;
  beds: string;
  setBeds: (beds: string) => void;
  bedrooms: string;
  setBedrooms: (bedrooms: string) => void;
  bathrooms: string;
  setBathrooms: (bathrooms: string) => void;
  minPrice: string;
  setMinPrice: (minPrice: string) => void;
  maxPrice: string;
  setMaxPrice: (maxPrice: string) => void;
  triggerSearch: (event: any) => void;
  results: any;
  formatQtt: (number: number, name: string) => void;
}

const SearchPresenter: React.FC<IProps> = ({
  loading,
  navigation,
  search,
  setSearch,
  beds,
  setBeds,
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  triggerSearch,
  results,
  formatQtt,
}) => (
  <DismissKeyboard>
    <>
      <Container>
        <SearchContainer>
          <SearchBar
            onChangeText={(text) => setSearch(text)}
            value={search}
            autoFocus={true}
            placeholder="Search by city..."
          />
          <CancelContainer onPress={() => navigation.goBack()}>
            <CancelText>Cancel</CancelText>
          </CancelContainer>
        </SearchContainer>
        <FiltersContainer
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <FilterContainer>
            <FilterLabel>Beds</FilterLabel>
            <Filter
              onChangeText={(text) => setBeds(text)}
              value={beds}
              placeholder="0"
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Bedrooms</FilterLabel>
            <Filter
              onChangeText={(text) => setBedrooms(text)}
              value={bedrooms}
              placeholder="0"
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Bathrooms</FilterLabel>
            <Filter
              onChangeText={(text) => setBathrooms(text)}
              value={bathrooms}
              placeholder="0"
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Min. price</FilterLabel>
            <Filter
              onChangeText={(text) => setMinPrice(text)}
              value={minPrice}
              placeholder="$0"
              keyboardType={"number-pad"}
            />
          </FilterContainer>
          <FilterContainer>
            <FilterLabel>Max. price</FilterLabel>
            <Filter
              onChangeText={(text) => setMaxPrice(text)}
              value={maxPrice}
              placeholder="$0"
              keyboardType={"number-pad"}
            />
          </FilterContainer>
        </FiltersContainer>
      </Container>
      <SearchBtn disabled={loading} onPress={triggerSearch}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <SearchText>Search</SearchText>
        )}
      </SearchBtn>
      {results && (
        <ResultsText>Showing {formatQtt(results.count, "result")}</ResultsText>
      )}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
        {results?.results?.map((room, index) => (
          <RoomCard
            api={true}
            key={index}
            name={room.name}
            price={room.price}
            photos={room.photos}
            uuid={room.uuid}
            isFav={room.is_fav}
            isSuperHost={room.user.superhost}
            roomObj={room}
          />
        ))}
      </ScrollView>
    </>
  </DismissKeyboard>
);

export default SearchPresenter;
