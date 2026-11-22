// Adapted from CCT360 Class 8, Example 3: Dynamic Interface Change.
let apiURL = "https://api.open-meteo.com/v1/forecast?latitude=43.589&longitude=-79.6441&current=temperature_2m,wind_speed_10m";

function getWeather() {
    document.querySelector("#message").textContent = "Loading weather...";

    fetch(apiURL)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Weather request failed.");
            }
            return response.json();
        })
        .then(function(data) {
            let temperature = data.current.temperature_2m;
            let wind = data.current.wind_speed_10m;

            document.querySelector("#temperature").textContent = "Temperature: " + temperature + " °C";
            document.querySelector("#wind").textContent = "Wind: " + wind + " km/h";

            if (temperature < 10) {
                document.body.className = "cold";
                document.querySelector("#message").textContent = "It is cold outside. Bring a warm jacket.";
            } else if (temperature < 25) {
                document.body.className = "mild";
                document.querySelector("#message").textContent = "It is mild outside. A light jacket may be useful.";
            } else {
                document.body.className = "hot";
                document.querySelector("#message").textContent = "It is hot outside. Wear something light.";
            }
        })
        .catch(function(error) {
            document.body.className = "";
            document.querySelector("#temperature").textContent = "Temperature: unavailable";
            document.querySelector("#wind").textContent = "Wind: unavailable";
            document.querySelector("#message").textContent = "Could not load weather. Please try the refresh button.";
            console.error("Error:", error);
        });
}

getWeather();
