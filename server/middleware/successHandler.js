const { dataResponse } = require("./dataResponse");

module.exports = function(options) {
  return function(data, req, res, next) {
    if (data.status === 200) {
      dataResponse(res, 200, data.message, null);
    } else {
      next(data);
    }
  };
};
