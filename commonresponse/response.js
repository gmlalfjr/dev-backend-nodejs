function response(code, massage, data) {
    return {
      code: code,
      message: massage,
      data: data
    };
  }
  const commonStatus = {
    success: function success(message,data) {
      return response(0, message, data);
    },
  
    error: function error(code, message) {
      return response(code, message, null);
    }
  };
  
  module.exports = commonStatus;