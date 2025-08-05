export function openModal() {
  document.getElementById('modal').classList.remove('hidden');
}

export function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

export function populateModal(bike) {
  document.getElementById('modal-title').textContent = bike.name;
  document.getElementById('modal-team').textContent = `Team: ${bike.team}`;
  document.getElementById('modal-year').textContent = `Year: ${bike.year}`;
  document.getElementById('modal-engine').textContent = `Engine: ${bike.engine}`;
}
