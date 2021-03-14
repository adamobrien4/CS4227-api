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

module.exports = {
  get,
};
