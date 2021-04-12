const Joi = require('joi');

const eventSchema = Joi.object().keys({
  eventID: Joi.string().alphanum().min(1).max(25).required(),
  eventTime: Joi.string().required(),
  eventType: Joi.object().keys({
    primary: Joi.string().alphanum().min(3).required(),
    description: Joi.string().min(3).required(),
  }),
  actor: Joi.object().keys({
    actorid: Joi.string().alphanum().min(1).max(25).required(),
    actoruserid: Joi.string().email({ tlds: { allow: false } }),
  }),
  stackholders: Joi.object().keys({
    ca: Joi.object().keys({
      id: Joi.string().alphanum().min(1).max(25).required(),
      name: Joi.string().min(3).required(),
      address: Joi.string().min(3).required(),
    }),
    actororg: Joi.object().keys({
      id: Joi.string().alphanum().min(1).max(25).required(),
      name: Joi.string().min(3).required(),
      address: Joi.string().min(3).required(),
    }),
    secondorg: Joi.object().keys({
      id: Joi.string().alphanum().min(1).max(25).required(),
      name: Joi.string().min(3).required(),
      address: Joi.string().min(3).required(),
    })
  }),
  payload: Joi.object().keys({
    data: Joi.any().optional()
  })

});


function validate(data) {
  const result = eventSchema.validate(data);
  const { value, error } = result;
  const valid = error == null;
  if (!valid) {
    //console.log(error)
    return false;
  }
  else {
    return true;
  }
}

module.exports = validate;
