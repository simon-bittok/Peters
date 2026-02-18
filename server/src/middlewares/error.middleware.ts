import type { ErrorHandler, NotFoundHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import ErrorResponse from "@/errors/index.ts";

const notFoundHandler: NotFoundHandler = (c) => {
  const response = new ErrorResponse(
    "RESOURCE_NOT_FOUND",
    "Page not found",
    `Resource ${c.req.path} not found`,
  );

  return c.json(response, 404);
};

const onErrorHandler: ErrorHandler = (err, c) => {
  const status =
    "status" in err && typeof err.status === "number" ? (err.status as ContentfulStatusCode) : 500;

  const response: ErrorResponse = new ErrorResponse("SERVER_ERROR", err.message, err.cause);

  return c.json(response, status);
};

export { notFoundHandler, onErrorHandler };
