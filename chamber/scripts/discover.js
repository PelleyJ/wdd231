// JSON fetch
fetch('data/discover.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("cardContainer");
    data.forEach((item, index) => {
      const card = document.createElement("section");
      card.classList.add("card");
      card.style.gridArea = `card${index + 1}`;

      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="images/${item.image}" alt="${item.name}" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;

      container.appendChild(card);
    });
  });

// localStorage for visit message
const visitDisplay = document.getElementById("visitMessage");
const MILLISECONDS_PER_DAY = 86400000;
const today = Date.now();
const lastVisit = Number(localStorage.getItem("lastVisit")) || 0;
let message = "Welcome! Let us know if you have any questions.";

if (lastVisit) {
  const daysBetween = Math.floor((today - lastVisit) / MILLISECONDS_PER_DAY);
  if (daysBetween < 1) {
    message = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${daysBetween} days ago.`;
  }
}
visitDisplay.textContent = message;
localStorage.setItem("lastVisit", today);
