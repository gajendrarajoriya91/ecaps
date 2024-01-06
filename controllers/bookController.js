const Book = require('../models/Book');

const createBook = async (req, res) => {
  try {
    const { title, author, publishedDate } = req.body;

    if (!title || !author || !publishedDate) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const book = new Book({
      title,
      author,
      publishedDate,
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error("Error in creating the book:", error);
    res.status(500).json({ error: "Error in creating the book." });
  }
};

const getBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalBooks = await Book.countDocuments();
    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const response = {
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page,
      books,
    };

    res.json(response);
  } catch (error) {
    console.error("Error in fetching books:", error);
    res.status(500).json({ error: "Error in fetching books." });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishedDate } = req.body;

    if (!title || !author || !publishedDate) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const book = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    res.json(book);
  } catch (error) {
    console.error("Error in updating the book:", error);
    res.status(500).json({ error: "Error in updating the book." });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).send("Book not found.");
    }

    res.json(book);
  } catch (error) {
    console.error("Error in deleting the book:", error);
    res.status(500).json({ error: "Error in deleting the book." });
  }
};

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
};
