document.addEventListener("astro:page-load", () => {
  const sections = document.querySelectorAll(
    "main#menu-scroll-container > section > div[id]",
  );
  const navLinks = document.querySelectorAll("a.nav-link");
  const navContainer = document.getElementById("menu");

  let currentActiveId = null;

  // Interceptar clics en los enlaces para evitar que se agregue #id a la URL
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-category-link");
      if (!targetId) return;

      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

        // Limpiar el hash de la URL sin recargar
        history.replaceState(null, "", window.location.pathname);
      }
    });
  });

  function updateActiveNav() {
    const viewportCenter = window.innerHeight / 2;
    let closestSection = null;
    let minDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewportCenter - sectionCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = section;
      }
    });

    if (!closestSection) return;

    const activeId = closestSection.getAttribute("id");

    if (activeId !== currentActiveId) {
      currentActiveId = activeId;

      navLinks.forEach((link) => {
        const isActive = link.getAttribute("data-category-link") === activeId;
        link.classList.toggle("active", isActive);
      });

      const activeLink = document.querySelector("a.nav-link.active");
      if (activeLink && navContainer) {
        const li = activeLink.closest("li");
        if (li) {
          const containerCenter = navContainer.offsetWidth / 2;
          const liCenter = li.offsetLeft + li.offsetWidth / 2;
          const targetScroll = liCenter - containerCenter;

          requestAnimationFrame(() => {
            navContainer.scrollTo({
              left: targetScroll,
              behavior: "smooth",
            });
          });
        }
      }
    }
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
});
