export const prerender = false;

type SSEClient = {
  id: number;
  send: (message: string) => void;
};

export let clients: SSEClient[] = [];
let clientId = 0;

export async function GET(): Promise<Response> {
  const id = clientId++;
  const encoder = new TextEncoder();

  let ping: ReturnType<typeof setInterval>;

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: string) => {
        try {
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        } catch (err) {
          console.error(`❌ Error al enviar a cliente #${id}:`, err);
        }
      };

      // Guardar cliente conectado
      clients.push({ id, send });

      // Ping cada 15 segundos
      ping = setInterval(() => {
        try {
          send("ping");
        } catch (err) {
          console.warn("❌ Error al enviar ping:", err);
        }
      }, 15000);
    },

    cancel() {
      // 🔌 Cliente desconectado
      clearInterval(ping);
      clients = clients.filter((c) => c.id !== id);
      console.log(`🧹 Cliente desconectado #${id}`);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
