const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    book_name: {
        type: String,
        required: [true, "Book name is required"],
    },
    category: {
        type: String,
        required: [true, "Category of book is required"],
    },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
