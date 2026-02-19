import type { $ZodIssue } from "zod/v4/core";

import { type ErrorCode } from "./codes.ts";

class ErrorResponse {
  code: ErrorCode;
  message: string;

  constructor(code: ErrorCode = "SERVER_ERROR", message: string) {
    this.code = code;
    this.message = message;
  }
}

class EntityNotFound extends Error {
  constructor(message: string = "Entity not found") {
    super(message);
  }

  public responseBody() {
    const response: ErrorResponse = {
      code: "RESOURCE_NOT_FOUND",
      message: this.message,
    };

    return response;
  }
}

class ValidationError extends Error {
  issues: $ZodIssue[];
  constructor(issues: $ZodIssue[]) {
    super("Validation error");
    this.issues = issues;
  }

  public responseBody() {
    const errors: Record<string, string> = {};

    for (const issue of this.issues) {
      const field = issue.path.join(".");

      errors[field] = issue.message;
    }

    const response: ErrorResponse = {
      code: "VALIDATION_ERROR",
      message: JSON.stringify(errors),
    };

    return response;
  }
}

export { EntityNotFound, ValidationError };

export default ErrorResponse;
