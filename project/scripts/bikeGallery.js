// scripts/bikeGallery.js
import { openModal, closeModal, populateModal } from './modal.js';
import { toggleFavorite, isFavorite } from './storage.js';

const gallery = document.getElementById('bike-gallery');
const modal = document.getElementById('modal');
const modalCloseBtn = document.getElementById('modal-close');

async function fetchBikes() {
  try {
    const response = await fetch('data/bikes.json');
    if (!response.ok) throw new Error('Failed to fetch bike data');
    const bikes = await response.json();
    displayBikes(bikes);
  } catch (error) {
    gallery.innerHTML = `<p class="error">Error loading bikes: ${error.message}</p>`;
  }
}

function displayBikes(bikes) {
  bikes.forEach((bike) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${bike.image}" alt="${bike.name}" loading="lazy">
      <div class="card-content">
        <h3>${bike.name}</h3>
        <p><strong>Team:</strong> ${bike.team}</p>
        <p><strong>Year:</strong> ${bike.year}</p>
        <button class="favorite" data-id="${bike.id}">
          ${isFavorite(bike.id) ? '★ Favorited' : '☆ Favorite'}
        </button>
        <button class="details" data-id="${bike.id}">More Info</button>
      </div>
    `;

    // Favorite toggle
    card.querySelector('.favorite').addEventListener('click', (e) => {
      toggleFavorite(bike.id);
      e.target.textContent = isFavorite(bike.id) ? '★ Favorited' : '☆ Favorite';
    });

    // Modal trigger
    card.querySelector('.details').addEventListener('click', () => {
      populateModal(bike);
      openModal();
    });

    gallery.appendChild(card);
  });
}

// Modal close functionality
modalCloseBtn.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

fetchBikes();
