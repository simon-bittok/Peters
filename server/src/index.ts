import router from "@/routes/index.ts";
import createApp from "@/utils/init.ts";

const app = createApp();

app.get("/", (c) => {
  return c.json({ message: "Hello Hono!" });
});

app.route("/api", router);

export default app;
