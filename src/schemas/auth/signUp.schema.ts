// Schema for check valid user data for register
const signUpSchema = {
  body: {
    type: 'object',
    props: {
      fullname: {
        type: 'string',
        required: true,
        min: 3,
        max: 255,
        messages: {
          string: 'نام و نام خانوادگی باید حاوی حروف باشد.',
          required: 'نام و نام خانوادگی الزامی می باشد.',
          stringMin: 'نام و نام خانوادگی نباید کم تر از 3 کاراکتر باشد.',
          stringMax: 'نام و نام خانوادگی نباید بیش تر از 255 کاراکتر باشد.',
        },
      },
      email: {
        type: 'email',
        required: true,
        messages: {
          email: 'ایمیل وارد شده صحیح نمی باشد.',
          required: 'ایمیل الزامی می باشد.',
        },
      },
      phone: {
        type: 'string',
        length: 11,
        required: true,
        pattern: '09([0-9][0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}',
        messages: {
          stringLength: 'شماره همراه بایستی 11 کاراکتر باشد.',
          required: 'شماره همراه الزامی می باشد',
          stringPattern: 'شماره همراه وارد شده صحیح نمی باشد.',
        },
      },
      password: {
        type: 'string',
        required: true,
        min: 8,
        max: 255,
        messages: {
          string: 'رمز عبور باید حاوی حروف باشد.',
          required: 'رمز عبور الزامی می باشد.',
          stringMin: 'رمز عبور نباید کم تر از 8 کاراکتر باشد.',
          stringMax: 'رمز عبور نباید بیش تر از 255 کاراکتر باشد.',
        },
      },
    },
  },
};

export default signUpSchema;
