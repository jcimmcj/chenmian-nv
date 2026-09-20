export async function onRequestGet(context) {
  const { env } = context;
  const raw = await env.CLASS_CARD_KV.get("posts");
  const posts = raw ? JSON.parse(raw) : [];
  return new Response(JSON.stringify(posts), {
    headers:{"Content-Type":"application/json"}
  })
}
