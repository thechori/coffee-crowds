var CoffeeShop = require('../models/coffeeShop');

exports.index = (req, res) => {
  // Grab all CoffeeShops
  CoffeeShop.find(function(err, coffeeShops) {
    if (err) { return res.send(err); }

    // Render
    res.render('index', {
      'title': 'Coffee Crowds',
      'message': 'Coffee Shops',
      'coffeeShops': coffeeShops
    });
  });
};
