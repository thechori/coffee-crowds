

exports.index = (req, res) => {
  res.render('index', {
    'title': 'Coffee Crowds',
    'message': 'Welcome to COFFEE CROWDS!!'
  })
};
