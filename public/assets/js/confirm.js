var confirmElements = document.querySelectorAll(".confirm");

confirmElements.forEach(el => {
  el.addEventListener("click", e => {
    if (!confirm("Are you sure?")) {
      e.preventDefault();
    }
  });
});
