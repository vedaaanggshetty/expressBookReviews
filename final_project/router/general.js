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

// Internal data endpoint to serve the 4 async routes without loop
public_users.get('/internal/books', (req, res) => {
    res.status(200).json(books);
});

// Function 1: Get all books using async/await with Axios
public_users.get('/', async function (req, res) {
  try {
     const response = await axios.get('http://localhost:5000/internal/books');  
     return res.status(200).send(JSON.stringify(response.data, null, 4));
  } catch (error) {
     return res.status(500).json({message: "Error fetching books list"});
  }
});

// Internal ISBN API
public_users.get('/internal/isbn/:isbn', (req, res) => {
    const book = books[req.params.isbn];
    if(book) res.json(book); else res.status(404).json({message:"Not found"});
});

// Function 2: Get book details by ISBN using async/await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
     const response = await axios.get(`http://localhost:5000/internal/isbn/${isbn}`);
     return res.status(200).json(response.data);
  } catch (error) {
     return res.status(500).json({message: "Error fetching book by ISBN"});
  }
 });
  
// Internal Author API
public_users.get('/internal/author/:author', (req, res) => {
    const bks = Object.values(books).filter(b => b.author === req.params.author);
    res.json(bks);
});

// Function 3: Get books by Author using async/await with Axios
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const response = await axios.get(`http://localhost:5000/internal/author/${author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({message: "Error fetching books by author"});
  }
});

// Internal Title API
public_users.get('/internal/title/:title', (req, res) => {
    const bks = Object.values(books).filter(b => b.title === req.params.title);
    res.json(bks);
});

// Function 4: Get books by Title using async/await with Axios
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const response = await axios.get(`http://localhost:5000/internal/title/${title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({message: "Error fetching books by title"});
  }
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
