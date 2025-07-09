const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#directory");

gridButton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

listButton.addEventListener("click", () => {
  display.classList.add("list");
  display.classList.remove("grid");
});

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  members.forEach(member => {
    const section = document.createElement("section");

    const img = document.createElement("img");
    img.src = `images/${member.image}`;
    img.alt = `${member.name} logo`;

    const name = document.createElement("h3");
    name.textContent = member.name;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const link = document.createElement("a");
    link.href = member.website;
    link.textContent = "Visit Website";
    link.target = "_blank";

    section.appendChild(img);
    section.appendChild(name);
    section.appendChild(address);
    section.appendChild(phone);
    section.appendChild(link);

    display.appendChild(section);
  });
}

getMembers();

// Footer info
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
