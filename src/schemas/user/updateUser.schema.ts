// Schema for check valid data for update user
const updateUserSchema = {
  body: {
    type: 'object',
    props: {
      fullname: {
        type: 'string',
        optional: true,
        min: 3,
        max: 255,
        messages: {
          string: 'نام و نام خانوادگی باید حاوی حروف باشد.',
          stringMin: 'نام و نام خانوادگی نباید کمتر از 3 کاراکتر باشد.',
          stringMax: 'نام و نام خانوادگی نباید بیشتر از 255 کاراکتر باشد.',
        },
      },
      email: {
        type: 'email',
        optional: true,
        messages: {
          email: 'ایمیل وارد شده صحیح نمی باشد.',
        },
      },
      phone: {
        type: 'string',
        length: 11,
        optional: true,
        pattern: '09([0-9][0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}',
        messages: {
          stringLength: 'شماره همراه بایستی 11 کاراکتر باشد.',
          stringPattern: 'شماره همراه وارد شده صحیح نمی باشد.',
        },
      },
      password: {
        type: 'string',
        optional: true,
        min: 8,
        max: 255,
        messages: {
          string: 'رمز عبور باید حاوی حروف باشد.',
          stringMin: 'رمز عبور نباید کمتر از 8 کاراکتر باشد.',
          stringMax: 'رمز عبور نباید بیشتر از 255 کاراکتر باشد.',
        },
      },
    },
  },
  params: {
    type: 'object',
    props: {
      userId: {
        type: 'uuid',
        required: true,
        messages: {
          uuid: 'شناسه وارد شده صحیح نمی باشد.',
          required: 'شناسه دسته بندی الزامی می باشد.',
        },
      },
    },
  },
};

export default updateUserSchema;
