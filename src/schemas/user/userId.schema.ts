// Schema for check valid user Id
const userIdSchema = {
  params: {
    type: 'object',
    props: {
      userId: {
        type: 'uuid',
        required: true,
        messages: {
          uuid: 'شناسه وارد شده صحیح نمی باشد.',
          required: 'شناسه کاربر الزامی می باشد.',
        },
      },
    },
  },
};

export default userIdSchema;
