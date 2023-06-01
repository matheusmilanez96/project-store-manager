module.exports = (req, res, next) => {
  const data = req.body;
  let err = false;
  data.forEach((sale) => {
    if (!sale.productId) {
      err = true;
    }
  });

  if (err) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};