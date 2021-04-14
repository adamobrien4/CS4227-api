const yup = require('yup');
const ObjectId = require('mongoose').Types.ObjectId;

yup.addMethod(yup.string, 'objectId', function (errorMessage) {
  return this.test('test-is-mongo-object-id', errorMessage, function (value) {
    const { path, createError } = this;

    return (
      ObjectId.isValid(value) || createError({ path, message: errorMessage })
    );
  });
});

const get = yup.object({
  menuId: yup
    .string()
    .objectId('Topic ID is not valid')
    .required('Must specify a menu ID'),
});

const add = yup.object({
  name: yup.string().required('Menu must supply a name'),
  main_course: yup.array(),
  dessert: yup.array(),
  sides: yup.array(),
  drinks: yup.array(),
});

module.exports = {
  get,
  add,
};
