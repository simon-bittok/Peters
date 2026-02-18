import { createRouter } from "@/utils/init.ts";

import authRoutes from "./auth.routes.ts";

const router = createRouter();

const routes = [authRoutes];

routes.forEach((route) => {
  router.route(route.path, route.handler);
});

export default router;
