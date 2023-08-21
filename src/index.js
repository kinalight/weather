async function showTemperature(response) {
  console.log("[response] -> ", response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let description = document.querySelector("#temperature-description");
  let humidity = document.querySelector("#temperature-humidity");
  let wind = document.querySelector("#temperature-wind");
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity + " % Humidity";
  wind.innerHTML = Math.round(response.data.wind.speed) + " km/h Speed";

  // setDate(response.data.dt);
  setDate();

  console.log("[data] -> ", response.data.weather[0].icon)
  let iconElement = document.querySelector("#icon");
  if (response.data.weather[0]) {
    iconElement.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  }
}

function setDate() {
  let now = new Date();

  let h2 = document.querySelector("h2");

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  h2.innerHTML = `${day} ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let h1 = document.querySelector("#city");
  let searchInput = document.querySelector("#query");
  h1.innerHTML = `${searchInput.value}`;
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=b6916a0e3446b7bdd89c218e9722025f&units=metric`;
  window.axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showLocation(position) {
  let h1 = document.querySelector("#city");
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=b6916a0e3446b7bdd89c218e9722025f&units=metric`;
  window.axios.get(apiUrl).then((response) => {
    h1.innerHTML = response.data.name;
    // console.log("[location weather response] -> ", response.data.name);
    showTemperature(response);
  });
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#location-button");
button.addEventListener("click", getCurrentPosition);

let tempNumberCelsius = 17;
const convertCelsius = document.getElementById("celsius-link");
const convertFahrenheit = document.getElementById("fahrenheit-link");
const temp = document.getElementById("temperature");

if (temp) {
  temp.innerText = tempNumberCelsius;
}

if (convertCelsius) {
  convertCelsius.addEventListener("click", () => {
    temp.innerText = tempNumberCelsius;
  });
}

if (convertFahrenheit) {
  convertFahrenheit.addEventListener("click", () => {
    const fahrenheit = Math.floor((tempNumberCelsius * 9) / 5 + 32);
    temp.innerText = fahrenheit;
  });
}
