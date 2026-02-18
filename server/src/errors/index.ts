import { type ErrorCode } from "./codes.ts";

class ErrorResponse {
  code: ErrorCode;
  message: string;

  constructor(code: ErrorCode = "SERVER_ERROR", message: string) {
    this.code = code;
    this.message = message;
  }
}

export default ErrorResponse;
