import type { ErrorHandler, NotFoundHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import ErrorResponse from "@/errors/index.ts";

const notFoundHandler: NotFoundHandler = (c) => {
  const response = new ErrorResponse("RESOURCE_NOT_FOUND", `Resource ${c.req.path} not found`);

  return c.json(response, 404);
};

const onErrorHandler: ErrorHandler = (err, c) => {
  const status =
    "status" in err && typeof err.status === "number" ? (err.status as ContentfulStatusCode) : 500;

  const response: ErrorResponse = new ErrorResponse(
    "SERVER_ERROR",
    "An internal server error occurred. Please try again later",
  );

  return c.json(response, status);
};

export { notFoundHandler, onErrorHandler };
