const IMG_ENDPOINT =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature";
const CRYPTO_ENDPOINT = "https://api.coingecko.com/api/v3/coins/bitcoin";
const WEATHER_ENDPOINT =
  "https://apis.scrimba.com/openweathermap/data/2.5/weather";
const ICON_URL = "https://openweathermap.org/img/wn/";

const TEST_ENDPOINT =
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=kjhgdsfljhalskjdhflaksdjhflkjhasdf";

const authorEl = document.querySelector("#author");
const cryptoTopEl = document.querySelector(".crypto-top");
const cryptoEl = document.querySelector(".crypto");
const timeEl = document.querySelector(".time");
const weatherEl = document.querySelector(".weather");

fetch(IMG_ENDPOINT)
  .then((response) => {
    if (!response.ok) {
      console.log(response.status);
      throw new Error("Something went wrong!");
    }
    return response.json();
  })
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    authorEl.innerText = `By: ${data.user.name}`;
  })
  .catch((err) => {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
    authorEl.innerText = `By: Dodi Achmad`;
    console.error(err);
  });

fetch(CRYPTO_ENDPOINT)
  .then((response) => {
    if (!response.ok) {
      throw Error("Something went wrong!");
    }
    return response.json();
  })
  .then((data) => {
    cryptoTopEl.innerHTML = `
      <img src=${data.image.small} alt=${data.name} />
      <span>${data.name}</span>
    `;

    cryptoEl.innerHTML += `
    <p>🎯: $${data.market_data.current_price.usd}</p>
    <p>⬆️: $${data.market_data.high_24h.usd}</p>
    <p>⬇️: $${data.market_data.low_24h.usd}</p>
    `;
  })
  .catch((err) => {
    console.error(err);
  });

// Create a new Date object.

function updateTime() {
  const currentTime = new Date();
  timeEl.textContent = currentTime.toLocaleTimeString("en-us", {
    timeStyle: "short",
  });
}
updateTime();
setInterval(updateTime, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `${WEATHER_ENDPOINT}?lon=${position.coords.longitude}&lat=${position.coords.latitude}&units=metric`,
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Something is wrong!");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const weatherIcon = data.weather[0].icon;
      const weatherMain = data.weather[0].main;
      const mainTemp = Math.floor(data.main.temp);

      weatherEl.innerHTML = `
        <img src=${ICON_URL}${weatherIcon}.png alt=${weatherMain} />
        <p class="weather-temp">${mainTemp}°C</p>
        <p class="weather-city">${data.name}</p>
      `;
    })
    .catch((err) => {
      console.log(err);
      weatherEl.innerHTML = `
        <p>Unable to fetch weather data</p>
      `;
    });
});
/**
 * Challenge: Display the weather icon as an <img />
 * inside the <div id="weather">
 *
 * This site shows an example URL for the icon:
 * https://openweathermap.org/weather-conditions
 *
 * Note: the weather icon is found instead data.weather, which is
 * an array of weather for that area. You can just access the first
 * item in that array to get the icon ID.
 */
