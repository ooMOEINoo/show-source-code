export const signUpRequestBodies = {
  description: 'user that we want to create',
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/User'},
      example: {
        fullname: 'moein zhmti',
        email: 'zhmtim1@gmail.com',
        phone: '09029441787',
        password: 'abcd12345678',
      },
    },
  },
};

export const signInRequestBodies = {
  description: 'user that we want login',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string', format: 'password' },
        },
        example: {
          email: 'zhmtim1@gmail.com',
          password: 'abcd12345678',
        },
        required: ['email', 'password'],
      },
    },
  },
};
