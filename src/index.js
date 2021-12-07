let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let day = now.getDay();
let hour = now.getHours();
let minuts = now.getMinutes();

function showResult(response) {
  let temprature = document.querySelector(".temp");
  let degree = Math.round(response.data.main.temp);
  temprature.innerHTML = degree;

  let discreption = document.querySelector("#description");
  discreption.innerHTML = response.data.weather[0].description;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} Km/h`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML = `Pressure: ${response.data.main.pressure}`;
}
function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let newCity = document.querySelector("#search-bar");
  cityName.innerHTML = newCity.value;

  let apiKey = "b0a51e422837fe6760203fb51f511416";
  let city = newCity.value;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showResult);
}
function changeInfo(response) {
  let cityName = document.querySelector("#city-name");
  let city = response.data.name;
  cityName.innerHTML = city;
  showResult(response);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b0a51e422837fe6760203fb51f511416";
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(changeInfo);
}
function getCurrentPos(event) {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
//first line
let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", changeCity);

let dayAndTime = document.querySelector("#day-and-time");
dayAndTime.innerHTML = `${days[day]} ${hour}:${minuts}`;

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", getCurrentPos);

//feature 3
// function changeTempToC(event) {
//   event.preventDefault();
//   let temprature = document.querySelector(".temp");
//   temprature.innerHTML = `19`;
// }

// function changeTempToF(event) {
//   event.preventDefault();
//   let temprature = document.querySelector(".temp");
//   temprature.innerHTML = `66`;
// }

// let cTemp = document.querySelector(".temp-symbol");
// cTemp.addEventListener("click", changeTempToC);

// let fTemp = document.querySelector(".Fehrnhit-symbol");
// fTemp.addEventListener("click", changeTempToF);
