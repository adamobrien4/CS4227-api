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

const add = yup.object({
  name: yup.string().required('Restaurant name is required'),
  genre: yup.string().required('Restaurant genre is required'),
  menu: yup
    .string()
    .objectId('Menu must be objectId')
    .required('Must specify menu id'),
  type: yup
    .string()
    .oneOf(['Over_18', 'Family_Friendly', 'Verified_Only'])
    .required('Must specify restaurant type'),
});

const remove = yup.object({
  restaurantId: yup.string().required('Must supply a restaurant id'),
});

module.exports = {
  add,
  remove,
};
