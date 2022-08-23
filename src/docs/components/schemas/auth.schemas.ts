export const user = {
  type: 'object',
  properties: {
    fullname: { type: 'string' },
    email: { type: 'string', format: 'email' },
    phone: { type: 'string' },
    password: { type: 'string', format: 'password' },
  },
  required: ['fullname', 'email', 'phone', 'password'],
};
