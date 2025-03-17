const express = require("express");
const { BookModel } = require("../models/book.model");
const { auth } = require("../middleare/auth.middleware");
const BookRouter = express.Router();

BookRouter.post("/add", auth, async (req, res) => {
  const { title, author, genre, year, description } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Only admins can add books" });
  }

  if (!title || !author || !genre || !year || !description) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const book = new BookModel({ title, author, genre, year, description });
    await book.save();
    res.status(201).json({ msg: "New book added successfully", book });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to add the book", error: error.message });
  }
});

BookRouter.get("/", auth, async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to fetch the book data", error: error.message });
  }
});

BookRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Failed to fetch book details", error: error.message });
  }
});

module.exports = {
  BookRouter,
};
