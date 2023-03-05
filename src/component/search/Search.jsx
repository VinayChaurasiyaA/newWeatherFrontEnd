import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { GEO_API_URL, geoOptions } from "../../api";
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const loadOptions = async (inputValue) => {
    return await fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoOptions
    )
      .then((response) => response.json())
      .then((response) => {
        //  console.log(response.data);
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.latitude}`,
              label: `${city.name} , ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };
  const handleOnchange = (searchData) => {
    setSearch(searchData);
    // console.log(e)
    onSearchChange(searchData);
    // setSearch('')
  };
  return (
    <AsyncPaginate
      placeholder="Enter city name"
      autoFocus
      value={search}
      onChange={handleOnchange}
      debounceTimeout={600} // if a user type really fast take a pause of 600msecond and then make request
      loadOptions={loadOptions}
      
    />
  );
};

export default Search;
