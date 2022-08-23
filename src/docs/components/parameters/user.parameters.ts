export const getUsersQuery = {
  in: 'query',
  name: 'details',
  schema: {
    type: 'string',
  },
  example: 'true'
};

export const getUserByIdParam = {
  in: 'path',
  name: 'userId',
  schema: {
    type: 'string',
    format: 'uuid',
  },
  required: true,
};

