import type { APIRoute } from "astro";
import { clients } from "./index";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug || typeof slug !== "string") {
      return new Response(JSON.stringify({ error: "Slug inválido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const message = JSON.stringify({ slug });

    for (const client of clients) {
      try {
        client.send(message);
      } catch (err) {
        console.error("❌ Error enviando mensaje SSE:", err);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error en notify endpoint:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
