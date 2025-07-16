document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
  const city = "Boise";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  // Fetch current weather
  fetch(weatherUrl)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("current-temp").textContent = Math.round(data.main.temp);
      document.getElementById("description").textContent = data.weather[0].description;
    })
    .catch((err) => console.error("Weather fetch error:", err));

  // Fetch 3-day forecast
  fetch(forecastUrl)
    .then((res) => res.json())
    .then((data) => {
      const forecastDiv = document.getElementById("forecast");
      forecastDiv.innerHTML = "<h3>3-Day Forecast:</h3>";
      const noonForecasts = data.list.filter(entry => entry.dt_txt.includes("12:00:00")).slice(0, 3);
      noonForecasts.forEach(entry => {
        const day = new Date(entry.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        const temp = Math.round(entry.main.temp);
        forecastDiv.innerHTML += `<p>${day}: ${temp}°F</p>`;
      });
    });

  // Load spotlight members
  fetch("data/members.json")
    .then((res) => res.json())
    .then((members) => {
      const spotlights = document.getElementById("spotlights");
      const goldSilver = members.filter(m => m.membership === "gold" || m.membership === "silver");
      const selected = goldSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

      selected.forEach(member => {
        const div = document.createElement("div");
        div.classList.add("spotlight-card");
        div.innerHTML = `
          <h3>${member.name}</h3>
          <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><a href="${member.website}" target="_blank">${member.website}</a></p>
          <p><strong>Level:</strong> ${member.membership}</p>
        `;
        spotlights.appendChild(div);
      });
    });

  // Footer year and last modified
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
});
