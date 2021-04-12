const yup = require('yup');

const add = yup.object({
  name: yup.string().required('Restaurant name is required'),
  genre: yup.string().required('Restaurant genre is required'),
});

const remove = yup.object({
  restaurantId: yup.string().required('Must supply a restaurant id'),
});

module.exports = {
  add,
  remove,
};
