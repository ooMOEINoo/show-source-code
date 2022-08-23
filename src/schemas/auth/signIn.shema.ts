// Schema for check valid user data for login
const signInSchema = {
  body: {
    type: 'object',
    props: {
      email: {
        type: 'email',
        required: true,
        messages: {
          email: 'ایمیل وارد شده صحیح نمی باشد.',
          required: 'ایمیل الزامی می باشد.',
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

export default signInSchema;
