module.exports = {
  dataResponse: function(res, status, data, error) {
    res.status(status).send({
      one_health_msg: data,
      error: error,
      status: status
    });
  },
  duplicateInformFormat: function(nameField) {
    return {
      status: 500,
      message: {
        message: nameField + " existed!!",
        code: 11000
      }
    };
  }
};
