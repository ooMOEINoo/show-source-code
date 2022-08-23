export const getUsersPath = {
  get: {
    tags: ['User'],
    summary: 'Get Users',
    description: 'Get All Users on the Site',
    security: [{ bearerAuth: [] }],
    parameters: [{ $ref: '#/components/parameters/getUsersQuery'}],
    responses: {
      200: { $ref: '#/components/responses/getUsersResponses/200' },
      401: { $ref: '#/components/responses/getUsersResponses/401' },
      403: { $ref: '#/components/responses/getUsersResponses/403' },
      429: { $ref: '#/components/responses/getUsersResponses/429' },
      500: { $ref: '#/components/responses/getUsersResponses/500' },
    },
  },
};

export const getUserByIdPath = {
  get: {
    tags: ['User'],
    summary: 'Get User',
    description: 'Get one User by Id',
    security: [{ bearerAuth: [] }],
    parameters: [{ $ref: '#/components/parameters/getUserByIdParam' }],
    responses: {
      200: { $ref: '#/components/responses/getUserByIdResponses/200' },
      400: { $ref: '#/components/responses/getUserByIdResponses/400' },
      401: { $ref: '#/components/responses/getUserByIdResponses/401' },
      403: { $ref: '#/components/responses/getUserByIdResponses/403' },
      404: { $ref: '#/components/responses/getUserByIdResponses/404' },
      429: { $ref: '#/components/responses/getUserByIdResponses/429' },
      500: { $ref: '#/components/responses/getUserByIdResponses/500' },
    },
  },
};

export const updateUserPath = {
  put: {
    tags: ['User'],
    summary: 'update user',
    description: 'update user by token(user.id)',
    security: [{ bearerAuth: [] }],
    requestBody: {
      $ref: '#/components/requestBodies/updateUserRequestBodies',
    },
    responses: {
      200: { $ref: '#/components/responses/updateUserResponses/200' },
      400: { $ref: '#/components/responses/updateUserResponses/400' },
      401: { $ref: '#/components/responses/updateUserResponses/401' },
      403: { $ref: '#/components/responses/updateUserResponses/403' },
      409: { $ref: '#/components/responses/updateUserResponses/409' },
      417: { $ref: '#/components/responses/updateUserResponses/417' },
      429: { $ref: '#/components/responses/updateUserResponses/429' },
      500: { $ref: '#/components/responses/updateUserResponses/500' },
    },
  },
};
