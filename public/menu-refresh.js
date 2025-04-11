console.log("🧠 menu-refresh.js activo");

if (window.location.pathname.split("/").length > 1) {
  const slug = window.location.pathname.split("/")[1];

  if (slug) {
    const source = new EventSource("/api/menu/events");

    source.onmessage = async (event) => {
      if (event.data === "ping") return;

      try {
        const { slug: updatedSlug } = JSON.parse(event.data);
        if (updatedSlug !== slug) return;

        console.log("🔁 Detected menu update. Reloading...");

        await fetch("/api/cache/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.error("❌ Error SSE:", err);
      }
    };
  }
}
