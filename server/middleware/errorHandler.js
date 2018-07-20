const { dataResponse } = require("./dataResponse");

export default options => {
  options = options || {};
  return function(err, req, res, next) {
    dataResponse(
      res,
      err.status,
      null,
      err.message || "An unknown error occurred"
    );
  };
};
