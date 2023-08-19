export default defineEventHandler((event) => {
  let res = event.node.res;
  res.setHeader("Cache-Control", `max-age=0 s-maxage=${86400}`);
});
