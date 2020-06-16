import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import SearchPresenter from "./SearchPresenter";
import api from "../../../api";

export default ({ token }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [beds, setBeds] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [bathrooms, setBathrooms] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [results, setResults] = useState<any>(null);
  const triggerSearch = async () => {
    setLoading(true);
    const form = {
      ...(search && { search }),
      ...(beds && { beds }),
      ...(bedrooms && { bedrooms }),
      ...(bathrooms && { bathrooms }),
      ...(minPrice && { min_price: minPrice }),
      ...(maxPrice && { max_price: maxPrice }),
    };
    try {
      const { data } = await api.search(form, token);
      setResults(data);
    } catch (e) {
      console.warn(e);
    } finally {
      Keyboard.dismiss();
      setLoading(false);
    }
  };
  const formatQty = (number: number, name: string) => {
    if (number === 1) {
      return `${number} ${name}`;
    } else {
      return `${number} ${name}s`;
    }
  };
  return (
    <SearchPresenter
      formatQty={formatQty}
      loading={loading}
      navigation={navigation}
      search={search}
      setSearch={setSearch}
      beds={beds}
      setBeds={setBeds}
      bedrooms={bedrooms}
      setBedrooms={setBedrooms}
      bathrooms={bathrooms}
      setBathrooms={setBathrooms}
      minPrice={minPrice}
      setMinPrice={setMinPrice}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
      triggerSearch={triggerSearch}
      results={results}
    />
  );
};
