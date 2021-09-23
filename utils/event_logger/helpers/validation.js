const Joi = require("joi");
const eventSchema = Joi.object().keys({
  eventID: Joi.string().min(1).max(50).required(),
  transactionId: Joi.string().min(1).max(50),
  eventTime: Joi.string().required(),
  eventType: Joi.object().keys({
    primary: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(50).required(),
  }),
  actor: Joi.object().keys({
    actorid: Joi.string().min(1).max(50).required(),
    actoruserid: Joi.string().min(1).max(50).required(),
    // actoruserid: Joi.string().email({ tlds: { allow: false } }),
  }),
  stackholders: Joi.object().keys({
    ca: Joi.object().keys({
      id: Joi.string().min(1).max(50).required(),
      name: Joi.string().min(1).max(50).required(),
      address: Joi.string().min(1).max(100).required(),
    }),
    actororg: Joi.object().keys({
      id: Joi.string().min(1).max(50).required(),
      name: Joi.string().min(1).max(50).required(),
      address: Joi.string().min(1).max(100).required(),
    }),
    secondorg: Joi.object().keys({
      id: Joi.string().min(1).max(50).required(),
      name: Joi.string().min(1).max(50).required(),
      address: Joi.string().min(1).max(100).required(),
    }),
  }),
  payload: Joi.object().keys({
    data: Joi.any().optional(),
  }),
  actorWarehouseId: Joi.string().min(1).max(50),
});

function validate(data) {
  const result = eventSchema.validate(data);
  const { value, error } = result;
  const valid = error == null;
  if (!valid) {
    console.log(error);
    return false;
  } else {
    console.log("success");
    return true;
  }
}
module.exports = validate;
