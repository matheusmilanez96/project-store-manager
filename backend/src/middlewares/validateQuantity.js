module.exports = (req, res, next) => {
  const data = req.body;
  let err = false;
  data.forEach((sale) => {
    if (!sale.quantity && sale.quantity !== 0) {
      err = true;
    }
  });

  if (err) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  
  next();
};