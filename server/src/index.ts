import createApp from "@/utils/init.utils.ts";

const app = createApp();

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

export default app;
