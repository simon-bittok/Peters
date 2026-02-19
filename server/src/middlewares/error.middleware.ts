import { APIError } from "better-auth";
import type { ErrorHandler, NotFoundHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import ErrorResponse, { EntityNotFound, ValidationError } from "@/errors/index.ts";

const notFoundHandler: NotFoundHandler = (c) => {
  const response = new ErrorResponse("RESOURCE_NOT_FOUND", `Resource ${c.req.path} not found`);

  return c.json(response, 404);
};

const onErrorHandler: ErrorHandler = (err, c) => {
  if (err instanceof ValidationError) {
    return c.json(err.responseBody(), 400);
  }

  if (err instanceof EntityNotFound) {
    return c.json(err.responseBody(), 404);
  }

  if (err instanceof APIError) {
    switch (err.body?.code) {
      case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
        const userExistsResponse: ErrorResponse = {
          code: "EMAIL_ALREADY_EXISTS",
          message: err.body.message ?? "user with email already exists",
        };
        return c.json(userExistsResponse, 409);

      case "INVALID_EMAIL_OR_PASSWORD":
        const invalidAuthResponse: ErrorResponse = {
          code: "AUTH_INVALID",
          message: err.body.message ?? "email and password failed to match",
        };
        return c.json(invalidAuthResponse, 401);

      case "INVALID_TOKEn":
        const invalidTokenResponse: ErrorResponse = {
          code: "AUTH_INVALID",
          message: err.body.message ?? "email and password failed to match",
        };
        return c.json(invalidTokenResponse, 401);
    }
  }

  const status =
    "status" in err && typeof err.status === "number" ? (err.status as ContentfulStatusCode) : 500;

  const response: ErrorResponse = new ErrorResponse(
    "SERVER_ERROR",
    "An internal server error occurred. Please try again later",
  );

  return c.json(response, status);
};

export { notFoundHandler, onErrorHandler };
