const yup = require('yup');

// TODO: Implement Schema
const add = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  address: yup.string(),
});

const remove = yup.object({
  customerId: yup.string().required('Must supply a customer id'),
});

module.exports = {
  add,
  remove,
};
