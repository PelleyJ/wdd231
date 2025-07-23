document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "7a90a82ba59a3da209310e539df8cfd5";
  const city = "Boise";

  // Fetch current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("current-temp").textContent = Math.round(data.main.temp);
      document.getElementById("description").textContent = data.weather[0].description;
    })
    .catch(err => console.error("Weather fetch error:", err));

  // Fetch 3-day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      const forecastDiv = document.getElementById("forecast");
      forecastDiv.innerHTML = "<h3>3-Day Forecast:</h3>";
      const noonForecasts = data.list.filter(entry => entry.dt_txt.includes("12:00:00")).slice(0, 3);
      noonForecasts.forEach(entry => {
        const day = new Date(entry.dt_txt).toLocaleDateString("en-US", { weekday: "long" });
        const temp = Math.round(entry.main.temp);
        forecastDiv.innerHTML += `<p>${day}: ${temp}°F</p>`;
      });
    })
    .catch(err => console.error("Forecast fetch error:", err));

  // Load spotlight members
  fetch("data/members.json")
    .then(res => res.json())
    .then(members => {
      const container = document.getElementById("spotlights");
      const selected = members
        .filter(m => m.membership === "gold" || m.membership === "silver")
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      selected.forEach(member => {
        const card = document.createElement("div");
        card.className = "spotlight-card";
        card.innerHTML = `
          <h3>${member.name}</h3>
          <img src="${member.image}" alt="${member.name} logo" loading="lazy">
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><a href="${member.website}" target="_blank">${member.website}</a></p>
          <p><strong>Level:</strong> ${member.membership}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Spotlight fetch error:", err));

  // Footer updates
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
});
