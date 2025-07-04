export const createError = (code, message, details = null, status = 400, type = 'business') => {
  const err = new Error(message);
  err.status = status;
  err.code = code;
  err.type = type; // validation | business | network
  if (details) err.details = details;
  return err;
}; 