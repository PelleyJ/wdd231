const FAVORITES_KEY = 'favoriteBikes';

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function isFavorite(bikeId) {
  return getFavorites().includes(bikeId);
}

export function toggleFavorite(bikeId) {
  let favorites = getFavorites();
  if (favorites.includes(bikeId)) {
    favorites = favorites.filter((id) => id !== bikeId);
  } else {
    favorites.push(bikeId);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
