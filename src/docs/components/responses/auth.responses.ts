import { defaultResponses } from './default.responses';

export const signUpResponses = {
  201: {
    description: 'Created',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          code: 201,
          status: 'Created',
          details: [{ message: 'ثبت نام با موفقیت انجام شد', data: null }],
        },
      },
    },
  },
  400: defaultResponses.error,
  409: {
    description: 'Conflict',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          code: 409,
          status: 'Conflict',
          details: [{ message: 'کاربری با این ایمیل ثبت شده است', data: null }],
        },
      },
    },
  },
  429: defaultResponses.rateLimiterError,
  500: defaultResponses.serverError,
};

export const signInResponses = {
  200: {
    description: 'Ok',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Api Response',
        },
        example: {
          code: 201,
          status: 'Ok',
          details: [
            {
              message: 'ورود با موفقیت انجام شد',
              data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            },
          ],
        },
      },
    },
  },
  400: defaultResponses.error,
  403: {
    description: 'Forbidden',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          status: 403,
          message: 'Forbidden',
          details: [{ message: 'رمز عبور صحیح نمی باشد', data: null }],
        },
      },
    },
  },
  404: {
    description: 'Not Found',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          status: 404,
          message: 'Not Found',
          details: [{ message: 'کاربری با این ایمیل یافت نشد', data: null }],
        },
      },
    },
  },
  429: defaultResponses.rateLimiterError,
  500: defaultResponses.serverError,
};
