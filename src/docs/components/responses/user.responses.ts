import { defaultResponses } from './default.responses';

export const getUsersResponses = {
  200: {
    description: 'Ok',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Api Response',
        },

        examples: {
          'details = false': {
            value: {
              code: 200,
              status: 'Ok',
              details: [
                {
                  message: 'لیست کاربران',
                  data: [
                    {
                      id: '21817d0b-290d-42af-bafe-4f91dc3e00fb',
                      fullname: 'moein zhmti',
                    },
                  ],
                },
              ],
            },
          },
          'details = true': {
            value: {
              code: 200,
              status: 'Ok',
              details: [
                {
                  message: 'لیست کاربران',
                  data: [
                    {
                      id: '21817d0b-290d-42af-bafe-4f91dc3e00fb',
                      fullname: 'moein zhmti',
                      email: 'zhmtim1@gmail.com',
                      phone: '09029441787',
                      role: 'admin',
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
  },
  401: defaultResponses.unauthorizedError,
  403: defaultResponses.forbiddenError,
  429: defaultResponses.rateLimiterError,
  500: defaultResponses.serverError,
};

export const getUserByIdResponses = {
  ...getUsersResponses,
  200: {
    description: 'Ok',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Api Response',
        },

        examples: {
          member: {
            value: {
              code: 200,
              status: 'Ok',
              details: [
                {
                  message: 'کاربر مورد نظر یافت شد',
                  data: {
                    id: '21817d0b-290d-42af-bafe-4f91dc3e00fb',
                    fullname: 'moein zhmti',
                    role: 'member',
                  },
                },
              ],
            },
          },
          'admin & super admin': {
            value: {
              code: 200,
              status: 'Ok',
              details: [
                {
                  message: 'کاربر مورد نظر یافت شد',
                  data: {
                    id: '21817d0b-290d-42af-bafe-4f91dc3e00fb',
                    fullname: 'moein zhmti',
                    email: 'zhmtim1@gmail.com',
                    phone: '09029441787',
                    role: 'member',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                    createdAt: '2022-08-21 11:40:12.709292',
                    updatedAt: '2022-08-22 20:13:32.825934',
                  },
                },
              ],
            },
          },
        },
      },
    },
  },
  400: defaultResponses.error,
  404: {
    description: 'Not Found',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          status: 404,
          message: 'Not Found',
          details: [{ message: 'کاربر مورد نظر یافت نشد', data: null }],
        },
      },
    },
  },
};

export const updateUserResponses = {
  ...getUsersResponses,
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
              message: 'اطلاعات با موفقیت بروزرسانی شد',
              data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
            },
          ],
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
          status: 409,
          message: 'Conflict',
          details: [
            {
              message: 'ایمیل وارد شده توسط کاربر دیگری انتخاب شده است',
              data: null,
            },
          ],
        },
      },
    },
  },
  417: {
    description: 'Expectation Failed',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/Api Response' },
        example: {
          status: 417,
          message: 'Expectation Failed',
          details: [{ message: 'بروزرسانی اطلاعات ناموفق بود', data: null }],
        },
      },
    },
  },
};
