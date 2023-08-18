import { createLog } from "~/server/db/requestLog";

export default defineEventHandler(async (event) => {
  let start = 0;

  event.node.req.on("data", () => {
    start = performance.now();
  });

  let ip =
    event.node.req.headers["x-forwarded-for"] ||
    event.node.req.socket.remoteAddress;
  // 判断ip是否是本地ip
  if (
    !ip ||
    ip === "::1" ||
    ip === "" ||
    (Array.isArray(ip) && ip[0].startsWith("192.168.")) ||
    (Array.isArray(ip) && ip[0].startsWith("10.")) ||
    (Array.isArray(ip) && ip[0].startsWith("172."))
  ) {
    return;
  }

  let url = event.node.req.url;
  let method = event.node.req.method;
  let userAgent = event.node.req.headers["user-agent"] || "";
  let status = event.node.res.statusCode;

  event.node.res.on("finish", async () => {
    const end = performance.now();
    const duration = end - start;
    await createLog({
      url,
      method,
      ip: Array.isArray(ip) ? ip[0] : ip,
      userAgent,
      status,
      duration,
    });
  });
});
