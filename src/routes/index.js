const Controllers = require('../controllers');


module.exports = (app, passport) => {
  app.get('/api', (req, res) => res.status(200).json({
    home: 'Bookshelf API',
    success: true,
  })),
  app.get('/api/users', Controllers.allUsers),
  app.get('/api/books', Controllers.books),
  app.post('/api/users', Controllers.createUsers),
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.status(200).json({
      message: 'Sign in successful',
      success: true
    })
  }),
  app.post('/api/books', Controllers.addBooks)
};
