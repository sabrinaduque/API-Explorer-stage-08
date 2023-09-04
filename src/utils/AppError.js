class AppError {
  message;
  statusCode;

  //quando não tiver erro de status code ele vai dar o erro 400 atuamaticamente
  constructor(message, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}

module.exports = AppError
