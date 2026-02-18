import { auth } from "@/utils/auth.ts";
import { createRouter } from "@/utils/init.ts";

const app = createRouter();

app.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));

export default {
  path: "/auth",
  handler: app,
};
