export const defaultResponses = {
  error: {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          status: 400,
          message: 'Bad Request',
          details: [{ message: 'درخواست صحیح نمی باشد', data: null }],
        },
      },
    },
  },

  unauthorizedError: {
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          status: 401,
          message: 'Unauthorized',
          details: [{ message: 'ابتدا وارد شوید', data: null }],
        },
      },
    },
  },

  forbiddenError: {
    description: 'Forbidden',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          status: 403,
          message: 'Forbidden',
          details: [{ message: 'اجازه دسترسی ندارید', data: null }],
        },
      },
    },
  },

  rateLimiterError: {
    description: 'Too Many Request',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          status: 429,
          message: 'Too Many Requests',
          details: [{ message: 'درخواست بیش از حد مجاز', data: null }],
        },
      },
    },
  },

  serverError: {
    description: 'Server Error',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          status: 500,
          message: 'Server Error',
          details: [{ message: 'خطایی سمت سرور رخ داده است', data: null }],
        },
      },
    },
  },
};
