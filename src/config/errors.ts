const errors = {
  validationFailed: {
    statusCode: 400,
    message: 'Validation Failed',
    error: 'Bad Request',
    code: 'BAD_REQUEST',
  },
  timeoutError: {
    statusCode: 408,
    message: 'Request Timeout',
    error: 'Request Timeout',
    code: 'TIMEOUT',
  },
};

export default errors;
