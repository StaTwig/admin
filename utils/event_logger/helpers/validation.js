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
  }),
  stackholders: Joi.object().keys({
    ca: Joi.object().keys({
      id: Joi.string().optional(),
      name: Joi.string().optional(),
      address: Joi.string().optional(),
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
  if (result?.error) {
    console.log(result.error);
    return false;
  } else {
    return true;
  }
}
module.exports = validate;
