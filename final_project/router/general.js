const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});



// Function 1: Get all books using Promise callbacks
public_users.get('/', function (req, res) {
  const get_books = new Promise((resolve, reject) => {
    resolve(books);
  });
  get_books.then((bk) => {
    res.status(200).send(JSON.stringify(bk, null, 4));
  });
});

// Function 2: Get book details by ISBN using Promise callbacks
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const get_book = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({status: 404, message: `Book with ISBN ${isbn} not found`});
    }
  });
  get_book.then(
    (bk) => res.status(200).send(JSON.stringify(bk, null, 4)),
    (err) => res.status(err.status).json({message: err.message})
  );
});


  
// Function 3: Get books by Author using Promise callbacks
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const get_books_by_author = new Promise((resolve, reject) => {
    let filtered_books = Object.values(books).filter(b => b.author === author);
    if (filtered_books.length > 0) {
      resolve(filtered_books);
    } else {
      reject({status: 404, message: `No books found by author ${author}`});
    }
  });
  get_books_by_author.then(
    (bks) => res.status(200).send(JSON.stringify(bks, null, 4)),
    (err) => res.status(err.status).json({message: err.message})
  );
});



// Function 4: Get books by Title using Promise callbacks
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const get_books_by_title = new Promise((resolve, reject) => {
    let filtered_books = Object.values(books).filter(b => b.title === title);
    if (filtered_books.length > 0) {
      resolve(filtered_books);
    } else {
      reject({status: 404, message: `No books found with title ${title}`});
    }
  });
  get_books_by_title.then(
    (bks) => res.status(200).send(JSON.stringify(bks, null, 4)),
    (err) => res.status(err.status).json({message: err.message})
  );
});



//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    res.status(200).json(book.reviews);
  } else {
    res.status(404).json({message: "Book not found"});
  }
});

// Authenticated routes for reviews
public_users.put('/review/:isbn', (req, res) => {
    // Auth check (simulating logic from index.js)
    if(!req.session.authorization) {
        return res.status(403).json({message: "User not logged in"});
    }
    const isbn = req.params.isbn;
    let filtered_book = books[isbn];
    if (filtered_book) {
        let review = req.query.review;
        let reviewer = req.session.authorization['username'];
        if(review) {
            filtered_book['reviews'][reviewer] = review;
            books[isbn] = filtered_book;
        }
        return res.status(200).send(`The review for the book with ISBN ${isbn} has been added/updated.`);
    }
    else {
        return res.status(404).json({message: `Book with ISBN ${isbn} not found`});
    }
});

public_users.delete('/review/:isbn', (req, res) => {
    // Auth check
    if(!req.session.authorization) {
        return res.status(403).json({message: "User not logged in"});
    }
    const isbn = req.params.isbn;
    let reviewer = req.session.authorization['username'];
    let filtered_book = books[isbn];
    if (filtered_book) {
        delete filtered_book['reviews'][reviewer];
        return res.status(200).send(`Reviews for the ISBN ${isbn} posted by the user ${reviewer} deleted.`);
    }
    else {
        return res.status(404).json({message: `Book with ISBN ${isbn} not found`});
    }
});

module.exports.general = public_users;
