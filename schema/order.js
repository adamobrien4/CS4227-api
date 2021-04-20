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
  orderId: yup
    .string()
    .objectId('Order ID is not valid')
    .required('Must specify a order ID'),
});

// TODO: More details
const add = yup.object({
  customer: yup
    .string()
    .objectId('Customer ID is not valid')
    .required('Must specify a customer ID'),
  restaurant: yup
    .string()
    .objectId('Restaurant ID is not valid')
    .required('Must specify a restaurant ID'),
  address: yup.string(),
  totalCost: yup.number(),
  foodCost: yup.number(),
  deliveryCost: yup.number(),
  discountCode: yup.string().nullable(),
  discountAmount: yup.number().nullable(),
  orderItems: yup.array(yup.string()),
});

const pay = yup.object({
  customer: yup
    .string()
    .required('Must specify a customer ID')
    .objectId('Customer ID is not valid'),
  restaurant: yup
    .string()
    .required('Must specify a restaurant ID')
    .objectId('Restaurant ID is not valid'),
});

module.exports = {
  get,
  add,
  pay,
};
