
export default function errorHandler(err, req, res, next) {
  // log error server-side (avoid leaking stack in production)
  // eslint-disable-next-line no-console
  console.error(err && err.stack ? err.stack : err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ message });
}