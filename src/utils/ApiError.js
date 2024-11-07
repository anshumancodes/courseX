class ApiError extends Error {
  constructor(statusCode,message="Something went wrong",errors=[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.sucess = false;
    this.message = message;
  }
}

export default ApiError;