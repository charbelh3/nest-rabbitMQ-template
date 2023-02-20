const errors = {
  validationFailed: {
    statusCode: 400,
    message: 'Validation Failed',
    error: 'Bad Request',
    code: 'BAD_REQUEST',
  },
  unauthorized: {
    statusCode: 401,
    message: 'Unauthorized Access',
    error: 'Unauthorized Access',
    code: 'UNAUTHORIZED',
  },
  forbidden: {
    statusCode: 403,
    message: 'Permission denied',
    error: 'Forbidden',
    code: 'FORBIDDEN',
  },
  timeoutError: {
    statusCode: 408,
    message: 'Request Timeout',
    error: 'Request Timeout',
    code: 'TIMEOUT',
  },
};

export default errors;
