import Search from "./component/search/Search";
import "./App.css";
import CurrentWeather from "./component/currentWeather/CurrentWeather";

import { WEATHER_API_URL , WEATHER_API_KEY } from "./api";
import { useEffect, useState } from "react";
import Forecast from "./component/forecast/Forecast";
function App() {
  const [currweatherResponse , setCurrWeatherResponse] = useState(null);
  const [forecastResponse , setForecastResponse] = useState(null);

  // const [background , setBackground] = useState(null);
  
  const handleOnChangeSearch = (searchData) => {
 //   console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )
    const forecaseFetch = fetch( `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch , forecaseFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastFetch = await response[1].json();

      setCurrWeatherResponse({city : searchData.label , ...weatherResponse});
      setForecastResponse({city: searchData.label , ...forecastFetch});
    })
    .catch((error) => console.log(error))

    // const newVal  = (currweatherResponse.city.split(","));
    // setBackground(newVal[0])

  }
//   useEffect(()=> {
//     document.body.style.backgroundImage = 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg'; 
//   //  document.body.style.zIndex = 10
//  } , [background])
  // eslint-disable-next-line no-lone-blocks
  console.log(background)
  // {currweatherResponse && 
  //   console.log(currweatherResponse.weather[0].description , currweatherResponse.city);
  // }
//  console.log(forecastResponse);

  return (
    <div className="container" >
      
      <Search onSearchChange={handleOnChangeSearch} />
      {currweatherResponse && <CurrentWeather data = {currweatherResponse}/>}
      {forecastResponse && <Forecast data={forecastResponse}/>}
    </div>
  );
}

export default App;
