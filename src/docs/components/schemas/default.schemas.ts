export const ApiResponse = {
  type: 'object',
  properties: {
    code: { type: 'integer' },
    status: { type: 'string' },
    details: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          data: {
            anyOf: [
              { type: 'string' },
              { type: 'number' },
              { type: 'boolean' },
              { type: 'array', items: {} },
              { type: 'object' },
            ],
          },
        },
      },
    },
  },
};

// export const Error = {
//   type: 'object',
//   properties: {
//     code: { type: 'integer' },
//     status: { type: 'string' },
//     details: {
//       type: 'array',
//       items: {
//         type: 'object',
//         properties: {
//           // type: { type: 'string' },
//           message: { type: 'string' },
//           // field: { type: 'string' },
//         },
//       },
//     },
//   },
// };
