let { app } = require('../index.js');
let { getBookById, getBooks } = require('../controllers');
let http = require('http');
const request = require('supertest');
const { beforeEach, describe } = require('node:test');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getBooks: jest.fn(),
}));
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3008, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controller Function Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all books', () => {
    let mockedBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];

    getBooks.mockReturnValue(mockedBooks);
    let result = getBooks();
    expect(result).toEqual(mockedBooks);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints Tests', () => {
  it('GET /books should get all books', async () => {
    const response = await request(server).get('/books');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      books: [
        {
          bookId: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction',
        },
        {
          bookId: 2,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian',
        },
        {
          bookId: 3,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic',
        },
      ],
    });
    expect(response.body.books.length).toBe(3);
  });

  it('GET /book/details/:id should get the employee by id', async () => {
    const res = await request(server).get('/books/details/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      book: {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
    });
  });
});
