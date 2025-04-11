export const prerender = false;
import { getMenuBySlug } from "../../../services/menu.service";

export async function POST({ request }: { request: Request }) {
  const body = await request.json();
  const { slug } = body;

  if (!slug || typeof slug !== "string") {
    return new Response(JSON.stringify({ error: "Missing or invalid slug" }), {
      status: 400,
    });
  }

  if (globalThis.menuCache?.has(slug)) {
    globalThis.menuCache.delete(slug);
    console.log(`♻️ Caché eliminada para: ${slug}`);
  }

  try {
    const data = await getMenuBySlug(slug);
    globalThis.menuCache.set(slug, data);
    console.log(`✅ Caché recargada automáticamente para: ${slug}`);
  } catch (err) {
    console.error("❌ Error recargando caché:", err);
  }

  return new Response(JSON.stringify({ success: true, slug }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
