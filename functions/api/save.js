export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();

  // 读取KV里已有帖子
  let posts = [];
  const raw = await env.CLASS_CARD_KV.get("posts");
  if(raw) posts = JSON.parse(raw);

  // 新增帖子
  posts.unshift({
    id: Date.now(),
    ...body
  });

  // 写回KV
  await env.CLASS_CARD_KV.put("posts", JSON.stringify(posts));

  return new Response(JSON.stringify({ok:true}), {
    headers:{"Content-Type":"application/json"}
  })
}
