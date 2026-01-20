export class ApiResponse {
  constructor(statusCode, data = null, message = 'Success') {
    this.success = statusCode >= 200 && statusCode < 300;
    this.statusCode = statusCode;
    this.message = message;

    if (data !== null) {
      this.data = data;
    }
  }
}