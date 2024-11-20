const express = require('express');
const { getBookById, getBooks } = require('./controllers');
const app = express();

app.use(express.json());

app.get('/books', async (req, res) => {
  const books = getBooks();
  res.json({ books });
});

app.get('/books/details/:id', async (req, res) => {
  const book = getBookById(parseInt(req.params.id));

  res.json({ book });
});

module.exports = { app };
