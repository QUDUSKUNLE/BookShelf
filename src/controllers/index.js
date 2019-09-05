const Users = require('../models/Users');
const Books = require('../models/Books');
const { setAsync, getAsync } = require('../cache');

class Controllers {

  static async createUsers(req, res) {
    try {
      const newUser = await (new Users(req.body)).save();
      res.status(201).json({
        message: 'New user created successfully',
        userDetails: {
          id: newUser._id,
          email: newUser.email
        }
      });
    } catch (e) {
      if (e.code === 11000) {
         return res.status(409).json({
          message: 'User already exist',
          success: false
        });
      }
      return res.status(500).json(e);
    }
  }

  static async allUsers(req, res) {
    let users;
    try {
      if (req.query.email) {
        const queryUser = await Users.findOne({ email: req.query.email});
        users = {
          id: queryUser._id,
          email: queryUser.email,
          username: queryUser.username
        }
        res.status(200).json({
          users,
          success: true,
        })
      } else {
        const allUsers = await Users.find({});
        users = allUsers.map((user) => ({
          id: user._id,
          email: user.email,
          username: user.username
        }));
        res.status(200).json({
          users,
          success: true,
        })
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }

  static async addBooks(req, res) {
    try {
      const newBook = await (new Books(req.body)).save();
      await setAsync(newBook.isbn, JSON.stringify(newBook));
      res.status(201).json({
        newBook,
        message: 'A new book added successful',
        success: true
      })
    } catch(e) {
      if (e.code === 11000) {
        return res.status(409).json({
          message: 'Book already exist',
          success: false
        });
      }
      return res.status(500).json(e);
    }
  }

  static async books(req, res) {
    try {
      if (req.query.isbn) {
        const cacheBook = await getAsync(req.query.isbn);
        if (cacheBook) {
          const book = JSON.parse(cacheBook);
          res.status(200).json({
            book,
            message: 'Fetch book successful'
          })
        } else {
          const book = await Books.findOne(req.query.isbn);
          res.status(200).json({
            book,
            success: true
          })
        }
      } else {
        const books = await Books.find({});
        res.status(200).json({
          books,
          success: true,
        })
      }
    } catch (e) {
      res.status(500).json(e)
    }
  }

  static async login(req, res) {
    try {
      
    } catch (e) {
      res.status(500).json(e);
    }
  }
}


module.exports = Controllers;
