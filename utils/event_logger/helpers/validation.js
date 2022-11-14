const Joi = require("joi");
const eventSchema = Joi.object().keys({
  eventID: Joi.string().required(),
  transactionId: Joi.string().required(),
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
      id: Joi.string().optional().allow(null),
      name: Joi.string().optional().allow(null),
      address: Joi.string().optional().allow(null),
    }),
    actororg: Joi.object().keys({
      id: Joi.string().optional().allow(null),
      name: Joi.string().optional().allow(null),
      address: Joi.string().optional().allow(null),
    }),
    secondorg: Joi.object().keys({
      id: Joi.string().optional().allow(null),
      name: Joi.string().optional().allow(null),
      address: Joi.string().optional().allow(null),
    }),
  }),
  payload: Joi.object().keys({
    data: Joi.any().optional(),
  }),
  actorWarehouseId: Joi.string().optional().allow(null),
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
