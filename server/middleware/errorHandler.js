export const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`,
  });
};

export const errorHandler = (error, req, res, next) => {
  console.error('Server error:', error);

  const statusCode = error.statusCode || error.status || 500;
  const message = statusCode === 400 && error.type === 'entity.parse.failed'
    ? 'Request body must contain valid JSON.'
    : error.message || 'Something went wrong on the server.';

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
