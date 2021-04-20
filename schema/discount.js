const yup = require('yup');

const get = yup.object({
  code: yup.string().required('Discount code is required'),
});

const remove = yup.object({
  customerId: yup.string().required('Must supply a customer id'),
});

module.exports = {
  get,
};
