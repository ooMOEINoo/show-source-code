export const signUpPath = {
  post: {
    tags: ['Auth'],
    summary: 'Signup User',
    description: 'Create new User',
    requestBody: { $ref: '#/components/requestBodies/signUpRequestBodies' },
    responses: {
      201: { $ref: '#/components/responses/signUpResponses/201' },
      400: { $ref: '#/components/responses/signUpResponses/400' },
      409: { $ref: '#/components/responses/signUpResponses/409' },
      429: { $ref: '#/components/responses/signUpResponses/429' },
      500: { $ref: '#/components/responses/signUpResponses/500' },
    },
  },
};

export const signInPath = {
  post: {
    tags: ['Auth'],
    summary: 'Signin User',
    description: 'Login in Website',
    requestBody: { $ref: '#/components/requestBodies/signInRequestBodies' },
    responses: {
      200: { $ref: '#/components/responses/signInResponses/200' },
      400: { $ref: '#/components/responses/signInResponses/400' },
      403: { $ref: '#/components/responses/signInResponses/403' },
      404: { $ref: '#/components/responses/signInResponses/404' },
      429: { $ref: '#/components/responses/signInResponses/429' },
      500: { $ref: '#/components/responses/signInResponses/500' },
    },
  },
};
