export function successResponse(data: any, message = 'Success') {
  return {
    status: true,
    message,
    data,
  };
}

export function errorResponse(message: string, statusCode = 400) {
  return {
    status: false,
    message,
    statusCode,
  };
}
