export default class CustomError extends Error {
  public statusCode: number;
  public status: string;
  public operationalError: boolean;
  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.operationalError = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
