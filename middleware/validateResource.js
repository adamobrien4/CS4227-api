const pick = require('lodash/pick');

const validateResourceMW = (resourceSchema, resourceType = 'body') => async (
  req,
  res,
  next
) => {
  const resource = req[resourceType];
  try {
    await resourceSchema.validate(resource);

    // Remove any fields which are not specified in the resource schema
    req[resourceType] = pick(req[resourceType], resourceSchema._nodes);

    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e.errors.join(', ') });
  }
};

module.exports = validateResourceMW;
