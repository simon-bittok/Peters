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
}

export { EntityNotFound };

export default ErrorResponse;
