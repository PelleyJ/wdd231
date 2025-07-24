// Set timestamp when page loads
document.getElementById("timestamp").value = new Date().toISOString();

// Modal handlers
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    document.getElementById(id).showModal();
  });
});
