import { type ErrorCode } from "./codes.ts";

class ErrorResponse {
  code: ErrorCode;
  message: string;
  details: string | unknown;

  constructor(code: ErrorCode = "SERVER_ERROR", message: string, details: unknown) {
    this.code = code;
    this.message = message;
    this.details = details;
  }
}

export default ErrorResponse;
