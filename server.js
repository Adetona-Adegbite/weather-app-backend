// `http://api.weatherapi.com/v1/forecast.json?key=9454b288894a40e4a14203247232609&q=${location}&days=5`;
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

async function fetchData(city) {
  const weatherData = [];
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=9454b288894a40e4a14203247232609&q=${city}&days=1`
    );
    const weatherObject = {
      city: response.data.location.name,
      country: response.data.location.country,
      temp_c: response.data.current.temp_c,
      temp_f: response.data.current.temp_f,
      text: response.data.current.condition.text,
      icon: response.data.current.condition.icon,
      humidity: response.data.current.humidity,
    };
    weatherData.push(weatherObject);
    return weatherData;
  } catch (e) {
    return e;
  }
}
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const data = await fetchData(city);
  res.json(data);
});

app.listen(4000, () => {
  console.log("Server has started on Port 4000");
});
