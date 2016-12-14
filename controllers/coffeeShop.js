

exports.getCoffeeShops = function(req, res) {
  res.send("[GET]");
};

exports.postCoffeeShops = function(req, res) {
  res.send("[POST] " + req.body.name);
};
