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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForcast(coords) {
  console.log(coords);
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForcast);
}

function showResult(response) {
  console.log(response);
  celsiusTemp = response.data.main.temp;
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

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForcast(response.data.coord);
}
function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let newCity = document.querySelector("#search-bar");
  cityName.innerHTML = newCity.value;

  let city = newCity.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(changeInfo);
}
function getCurrentPos(event) {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function changeTempToC(event) {
  event.preventDefault();
  let temprature = document.querySelector(".temp");
  temprature.innerHTML = Math.round(celsiusTemp);
}

function changeTempToF(event) {
  event.preventDefault();
  let temprature = document.querySelector(".temp");
  let f = (celsiusTemp * 9) / 5 + 32;
  temprature.innerHTML = Math.round(f);
}
function displayForcast(response) {
  let forcastArray = response.data.daily;

  let forcast = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;

  forcastArray.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `
  <div class="col-sm-2">
    <div class="card">
      <div class="card-body weather-info cards">
        <p>${formatDay(forcastDay.dt)}</p>
        <img
          src="http://openweathermap.org/img/wn/${
            forcastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="50"
        />
        <br />

        <div class="forcast-degree">
          <span id="max">${Math.round(forcastDay.temp.max)}°</span>
          <span id="min"> ${Math.round(forcastDay.temp.min)}°</span>
        </div>
      </div>
    </div>
  </div>
`;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcast.innerHTML = forcastHTML;
}

//first line
let celsiusTemp = null;
getCurrentPos();

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", changeCity);

let dayAndTime = document.querySelector("#day-and-time");
dayAndTime.innerHTML = `${days[day]} ${hour}:${minuts}`;

let cTemp = document.querySelector(".temp-symbol");
cTemp.addEventListener("click", changeTempToC);

let fTemp = document.querySelector(".Fehrnhit-symbol");
fTemp.addEventListener("click", changeTempToF);
let apiKey = "b0a51e422837fe6760203fb51f511416";
