const notFound =  (req, res, next) => {
  // catch 404 and forward to error handler
  return res.status(404).json({
    msg: 'Not Found'
  });
};

export default notFound;