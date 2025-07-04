export const createError = (code, message, details = null, status = 400) => {
  const err = new Error(message);
  err.status = status;
  err.code = code;
  if (details) err.details = details;
  return err;
}; 