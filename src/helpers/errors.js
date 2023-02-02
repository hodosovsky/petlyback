class CustomError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class NotAuthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class EmailConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  CustomError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  EmailConflictError,
};
