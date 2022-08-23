export const updateUserRequestBodies = {
  description: 'User that We want Login',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          fullname: { type: 'string' },
          email: { type: 'string', format: 'email' },
          phone: { type: 'string' },
          password: { type: 'string', format: 'password' },
        },
        example: {
          fullname: 'moein zahmati',
          email: 'zhmtim1@gmail.com',
          phone: '09029441787',
          password: 'abcd12345678',
        },
      },
    },
  },
};
