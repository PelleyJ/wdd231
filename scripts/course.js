const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 1, completed: true, category: "WDD" },
  { code: "WDD 131", name: "Dynamic Web", credits: 1, completed: true, category: "WDD" },
  { code: "WDD 231", name: "Frontend Development I", credits: 1, completed: false, category: "WDD" },
  { code: "CSE 121b", name: "JavaScript Language", credits: 1, completed: false, category: "CSE" },
  { code: "CSE 111", name: "Programming Principles", credits: 1, completed: true, category: "CSE" }
];

function renderCourses(filter = "All") {
  const container = document.getElementById("courseCards");
  container.innerHTML = "";

  let filtered = filter === "All" ? courses : courses.filter(c => c.category === filter);
  let totalCredits = filtered.reduce((sum, c) => sum + c.credits, 0);

  document.getElementById("totalCredits").textContent = `The total credits for courses listed above is: ${totalCredits}`;

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card " + (course.completed ? "completed" : "incomplete");
    card.innerHTML = `<strong>${course.code}</strong>: ${course.name}`;
    container.appendChild(card);
  });
}

document.getElementById("allBtn").addEventListener("click", () => renderCourses("All"));
document.getElementById("cseBtn").addEventListener("click", () => renderCourses("CSE"));
document.getElementById("wddBtn").addEventListener("click", () => renderCourses("WDD"));

renderCourses();
