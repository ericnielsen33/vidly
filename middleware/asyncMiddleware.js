module.exports = function (routeHandler) {
  return async (req, res, next) => {
    try {
      await routeHandler(req, res);
    } catch (err) {
      next(err);
    }
  };
};
