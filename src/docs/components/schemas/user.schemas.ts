export const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    fullname: { type: 'string' },
    email: { type: 'string', format: 'email' },
    phone: { type: 'string' },
    role: { type: 'string' },
  },
};
