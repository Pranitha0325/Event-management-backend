const axios = require("axios");

const getWeather = async (location, date) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&date=${date}`
  );
  return response.data.forecast.forecastday[0].day.condition.text;
};

module.exports = { getWeather };
