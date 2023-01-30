class customError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends customError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends customError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class notAuthorizedError extends customError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class emailConflictError extends customError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  customError,
  ValidationError,
  WrongParametersError,
  notAuthorizedError,
  emailConflictError,
};
