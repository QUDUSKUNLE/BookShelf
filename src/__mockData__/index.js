const faker = require('faker');
const uniqueString = require('unique-string');

module.exports =  {
  login: '',
  signUp: {
    username: 'Bola',
    email: faker.internet.email(),
    password: '123456789'
  },
  book: {
    title: faker.name.findName(),
    description: 'The Big bang theory',
    isbn: uniqueString(),
    author: 'Chinua Achebe'
  },
  isbn: '40b478baa27ed0ca7ad94714f0812dab',
}
