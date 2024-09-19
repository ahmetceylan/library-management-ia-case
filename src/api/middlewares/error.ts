import winston from "winston";
/* istanbul ignore next */
const error = (err, req, res, next) => {
  //ERROR HANDLING
  /**
   * Define error-handling middleware functions in the same way as other middleware functions, 
   * except with four arguments instead of three, 
   * specifically with the signature (err, req, res, next)):
   */
  if (!err) return next();
  
  winston.error(err.message);
  // Handle json error and send a message
  if (err instanceof SyntaxError) {
    res.status('400').send({
      msg: "Request body must be in valid JSON format. Error is ;" + err.message,
    })
  } else {
    res.status(500).send({
      msg: err.message,
    });
  }
};

export default error;
