import type { Hono } from "hono";
import type { PinoLogger } from "hono-pino";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    requestId: string;
  };
}

export type AppAPI = Hono<AppBindings>;
