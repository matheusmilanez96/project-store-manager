module.exports = (req, res, next) => {
    const data = req.body;
    let err = false;
    data.forEach((sale) => {
      if (Number(sale.quantity) < 1) {
        err = true;
      }
    });
  
    if (err) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    
    next();
  };