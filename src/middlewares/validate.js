// src/middlewares/validate.middleware.js
export const validate = (schema) => (req, res, next) => {
  try {
    // Validate request body
    req.body = schema.parse(req.body);
    next(); // Proceed to controller if valid
  } catch (err) {
    next(err); // Pass error to app-level error handler
  }
};
