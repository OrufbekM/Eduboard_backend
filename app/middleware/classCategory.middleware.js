module.exports.validateCreateClassCategory = (req, res, next) => {
    const { name } = req.body;
  
    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Category name is required",
      });
    }
  
    next();
  };
  

module.exports.validateUpdateClassCategory = (req, res, next) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      message: "Name is required",
    });
  }

  next();
};


module.exports.validateClassCategoryId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "Valid category id is required",
    });
  }

  next();
};
