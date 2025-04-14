import React, { useState, useRef } from "react";

export default function FavButton({ name, size = 24, detailPage = false }) {
  // Detectamos SSR:
  const isSSR = typeof window === "undefined";

  if (!name) throw new Error("El prop 'name' es requerido en FavButton");

  if (isSSR) {
    // En el servidor, retornamos un bloque con el mismo tamaño para no romper el layout
    // pero sin hacer lectura de localStorage ni nada que rompa SSR
    return (
      <span
        style={{
          display: "inline-block",
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></span>
    );
  }

  // En el cliente, ya podemos usar localStorage con tranquilidad
  const storedFavs = JSON.parse(localStorage.getItem("chefcloud_favs") || "[]");
  const isInitiallyFav = storedFavs.includes(name.toLowerCase());

  const [isFav, setIsFav] = useState(isInitiallyFav);
  const btnRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();

    let favs = JSON.parse(localStorage.getItem("chefcloud_favs") || "[]");
    if (isFav) {
      const updatedFav = favs.filter((f) => f !== name.toLowerCase());
      setIsFav(false);
      localStorage.setItem("chefcloud_favs", JSON.stringify(updatedFav));

      // Animación corta de "quitar"
      if (btnRef.current) {
        btnRef.current.classList.add("animate-remove");
        setTimeout(() => {
          btnRef.current && btnRef.current.classList.remove("animate-remove");
        }, 200);
      }
    } else {
      if (!favs.includes(name.toLowerCase())) {
        favs.push(name.toLowerCase());
      }
      setIsFav(true);
      localStorage.setItem("chefcloud_favs", JSON.stringify(favs));

      // Animación completa
      if (btnRef.current) {
        btnRef.current.classList.add("animate");
        setTimeout(() => {
          btnRef.current && btnRef.current.classList.remove("animate");
        }, 600);
      }
    }
  };

  return (
    <button
      ref={btnRef}
      className="fav-btn"
      data-fav={String(isFav)}
      aria-label="Agregar a favoritos"
      type="button"
      onClick={handleClick}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 14 13"
        className="heart-svg"
      >
        <path
          d="M8.81803 10.9983L8.81746 10.9987C8.4498 11.2879 8.12003 11.5429 7.80182 11.728C7.48349 11.9133 7.22367 12 7 12C6.77645 12 6.51667 11.9132 6.19818 11.7279C5.87979 11.5426 5.55002 11.2878 5.18207 10.999C4.9784 10.8391 4.77092 10.6798 4.56206 10.5194C3.68444 9.84555 2.78254 9.15304 2.03757 8.31778C1.13245 7.30296 0.5 6.11747 0.5 4.57934C0.5 3.07266 1.35496 1.80668 2.52589 1.2737C3.66585 0.75482 5.19362 0.895191 6.64046 2.3923L7 2.76433L7.35954 2.3923C8.80632 0.895249 10.3341 0.755163 11.474 1.27428C12.645 1.80752 13.5 3.07373 13.5 4.58003C13.5 6.11784 12.8677 7.30333 11.9627 8.31804C11.2165 9.15469 10.3126 9.84816 9.43335 10.5227C9.22607 10.6817 9.02017 10.8397 8.81803 10.9983Z"
          fill="currentColor"
          stroke={!detailPage ? "#ffffff9a" : "black"}
        ></path>
      </svg>
      <span className="heart-effect">❤️</span>
      <span className="sparkle sparkle-left-1"></span>
      <span className="sparkle sparkle-left-2"></span>
      <span className="sparkle sparkle-left-3"></span>
      <span className="sparkle sparkle-right-1"></span>
      <span className="sparkle sparkle-right-2"></span>
      <span className="sparkle sparkle-right-3"></span>
    </button>
  );
}
