exports.successResponse = function (req, res, msg) {
  const data = {
    success: true,
    message: req.t(msg),
  };
  return res.status(200).json(data);
};

exports.successResponseWithData = function (req, res, msg, data) {
  const resData = {
    success: true,
    message: req.t(msg),
    data: data,
  };
  return res.status(200).json(resData);
};

exports.ErrorResponse = function (req, res, msg) {
  const data = {
    success: false,
    message: req.t(msg),
  };
  return res.status(500).json(data);
};

exports.notFoundResponse = function (req, res, msg) {
  const data = {
    success: false,
    message: req.t(msg),
  };
  return res.status(404).json(data);
};

exports.validationErrorWithData = function (req, res, msg, data) {
  console.log(data);
  for (const error in data) {
    data[error.param] = req.t(error.msg);
  }
  const resData = {
    success: false,
    message: msg,
    data: data,
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (req, res, msg) {
  const data = {
    success: false,
    message: req.t(msg),
  };
  return res.status(401).json(data);
};

exports.forbiddenResponse = function (req, res, msg) {
  const data = {
    success: false,
    message: req.t(msg),
  };
  return res.status(403).json(data);
};
