document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('members-container');
  const gridBtn = document.getElementById('grid-view');
  const listBtn = document.getElementById('list-view');

  fetch('data/members.json')
    .then(response => response.json())
    .then(data => {
      displayMembers(data);
    });

  function displayMembers(members) {
    container.innerHTML = '';
    members.forEach(member => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
      `;
      container.appendChild(card);
    });
  }

  gridBtn.addEventListener('click', () => {
    container.className = 'grid';
  });
  listBtn.addEventListener('click', () => {
    container.className = 'list';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});
