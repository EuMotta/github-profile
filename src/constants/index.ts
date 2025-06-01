export const errorList = [
  { statusCode: 400, message: 'Bad Request' },
  { statusCode: 401, message: 'Unauthorized' },
  { statusCode: 403, message: 'Forbidden' },
  { statusCode: 404, message: 'Not Found' },
  { statusCode: 422, message: 'Validation Failed: Repository or user not found or inaccessible' },
  { statusCode: 500, message: 'Internal Server Error' },
];

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
