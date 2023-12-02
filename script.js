// Defining API endpoints
const IMG_ENDPOINT =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"; // API endpoint to fetch images
const CRYPTO_ENDPOINT = "https://api.coingecko.com/api/v3/coins/bitcoin"; // API endpoint to fetch bitcoin data from coingecko
const WEATHER_ENDPOINT =
  "https://apis.scrimba.com/openweathermap/data/2.5/weather"; // API endpoint to fetch weather data
const ICON_URL = "https://openweathermap.org/img/wn/"; // Base URL of weather icons

// Get DOM elements
const authorEl = document.querySelector("#author"); // Element to display image author name
const cryptoTopEl = document.querySelector(".crypto-top"); // Element to display top crypto data
const cryptoEl = document.querySelector(".crypto"); // Element to display crypto data
const timeEl = document.querySelector(".time"); // Element to display time
const weatherEl = document.querySelector(".weather"); // Element to display weather data

// Fetch and display image from Unsplash
fetch(IMG_ENDPOINT)
  .then((response) => {
    if (!response.ok) {
      console.log(response.status);
      throw new Error("Something went wrong!"); // If response is not ok, throw an error
    }
    return response.json();
  })
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`; // Set fetched image as background
    authorEl.innerText = `By: ${data.user.name}`; // Display image author name
  })
  .catch((err) => {
    // If there is an error,use a default background image and author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
    authorEl.innerText = `By: Dodi Achmad`;
    console.error(err); // Log error
  });

// Fetch and display crypto data from CoinGecko
fetch(CRYPTO_ENDPOINT)
  .then((response) => {
    if (!response.ok) {
      throw Error("Something went wrong!"); // If response is not ok, throw an error
    }
    return response.json();
  })
  .then((data) => {
    cryptoTopEl.innerHTML = `
      <img src=${data.image.small} alt=${data.name} />
      <span>${data.name}</span>
    `; // Display crypto name and icon
    cryptoEl.innerHTML += `
    <p>🎯: $${data.market_data.current_price.usd}</p>
    <p>⬆️: $${data.market_data.high_24h.usd}</p>
    <p>⬇️: $${data.market_data.low_24h.usd}</p>
    `; // Display crypto prices
  })
  .catch((err) => {
    console.error(err); // Log any errors
  });

// Update time every second
function updateTime() {
  const currentTime = new Date(); // Get the current time
  timeEl.textContent = currentTime.toLocaleTimeString("en-us", {
    timeStyle: "short",
  }); // Display the current time
}
updateTime(); // Update time immediately
setInterval(updateTime, 1000); // Then update every second

// Fetch and display weather data based on current geographical position
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `${WEATHER_ENDPOINT}?lon=${position.coords.longitude}&lat=${position.coords.latitude}&units=metric`,
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Something is wrong!"); // If response is not ok, throw an error
      }
      return res.json();
    })
    .then((data) => {
      const weatherIcon = data.weather[0].icon; // Get weather icon
      const weatherMain = data.weather[0].main; // Get main weather
      const mainTemp = Math.floor(data.main.temp); // Get temperature

      weatherEl.innerHTML = `
        <img src=${ICON_URL}${weatherIcon}.png alt=${weatherMain} />
        <p class="weather-temp">${mainTemp}°C</p>
        <p class="weather-city">${data.name}</p>
      `; // Display fetched weather data
    })
    .catch((err) => {
      console.log(err); // Log any errors
      weatherEl.innerHTML = `
        <p>Unable to fetch weather data</p>
      `; // If an error occurred, show an error message
    });
});
