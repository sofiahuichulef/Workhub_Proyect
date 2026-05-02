export default function errorHandler(err, req, res, next) {
  res.status(500).json({
    error: true,
    message: err?.message || 'Error interno del servidor',
  });
}

