export const isValidDate = (value) => !Number.isNaN(Date.parse(value));

export const safeJsonResponse = (res, statusCode, payload) => {
  res.status(statusCode).json(payload);
};
