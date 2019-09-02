const Controllers = require('../controllers');


module.exports = (app, passport) => {
  app.get('/api', (req, res) => res.status(200).json({
    home: 'Bookshelf API',
    success: true,
  })),
  app.post('/api/users', Controllers.createUsers),
  app.get('/api/users', Controllers.allUsers),
  app.post('/api/signin', passport.authenticate('local')),
  app.get('/api/books', Controllers.books),
  app.post('/api/books', Controllers.addBooks)
};
