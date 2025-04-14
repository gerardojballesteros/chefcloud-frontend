document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "chefcloud_favs";
  const buttons = document.querySelectorAll("button.fav-btn");

  const slugify = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");

  const favs = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));

  buttons.forEach((btn) => {
    const id = btn.dataset.id;
    const svg = btn.querySelector("svg");

    if (favs.has(id)) {
      svg.classList.add("filled");
    }

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (favs.has(id)) {
        favs.delete(id);
        svg.classList.remove("filled");
      } else {
        favs.add(id);
        svg.classList.add("filled");
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favs]));
    });
  });
});
