// toronto weather from open-meteo
let apiURL = "https://api.open-meteo.com/v1/forecast?latitude=43.65&longitude=-79.38&current=temperature_2m,wind_speed_10m";

async function getWeather() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();

    let temperature = data.current.temperature_2m;
    let wind = data.current.wind_speed_10m;

    // show the numbers
    document.querySelector("#temperature").textContent = temperature + "°C";
    document.querySelector("#wind").textContent = wind + " km/h";

    // change the page depending on the temperature
    if (temperature < 5) {
      document.body.className = "cold";
      document.querySelector("#emoji").textContent = "🥶";
      document.querySelector("#message").textContent = "its freezing. wear a coat!!";
    } else if (temperature < 15) {
      document.body.className = "mild";
      document.querySelector("#emoji").textContent = "😐";
      document.querySelector("#message").textContent = "its ok. bring a jacket i guess";
    } else {
      document.body.className = "hot";
      document.querySelector("#emoji").textContent = "🥵";
      document.querySelector("#message").textContent = "its hot. no jacket needed";
    }

    // more wind = bigger emoji
    document.querySelector("#emoji").style.fontSize = 100 + wind * 5 + "px";

  } catch (error) {
    console.error("Error:", error);
    document.querySelector("#message").textContent = "the weather broke :(";
  }
}

// run it when the page loads
getWeather();

// run it again when you click the button
document.querySelector("#button").addEventListener("click", getWeather);
