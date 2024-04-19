function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#details");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let wind = response.data.wind.speed;
  let timeElement = document.querySelector("#time");
  let dateElement = document.querySelector("#date");
  let time = new Date(response.data.time * 1000);
  let date = new Date();
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(date);
  timeElement.innerHTML = formatTime(time);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(wind);
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                alt="few clouds"
                class="weather-app-icon"
              />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}`;
}

function formatTime(time) {
  let minutes = time.getMinutes();
  let hours = time.getHours();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function searchCity(city) {
  // make api call and update the interface
  let apiKey = "2a3foafb9td8f2884233b70e0d8d2700";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "2a3foafb9td8f2884233b70e0d8d2700";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
            <div class="weather-forecast-date">Fri</div>
            <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
              class="weather-forecast-icon"
            />
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature"><strong>00</strong></div>
              <div class="weather-forecast-temperature">00</div>
            </div>
          </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Miami");
