import { Hono } from "hono";
import { pinoLogger } from "hono-pino";
import { requestId } from "hono/request-id";
import pino from "pino";

import { notFoundHandler, onErrorHandler } from "@/middlewares/error.middleware.ts";
import type { AppBindings } from "@/types/app.types.ts";

function createRouter() {
  return new Hono<AppBindings>({ strict: false });
}

function createApp() {
  const app = createRouter();

  app.use(
    "*",
    pinoLogger({
      pino: {
        level: "debug",
        timestamp: pino.stdTimeFunctions.unixTime,
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      },
    }),
  );

  app.use("*", requestId());

  // Error interceptors
  app.notFound(notFoundHandler);
  app.onError(onErrorHandler);

  return app;
}

export { createRouter };
export default createApp;
