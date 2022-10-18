const router = require("express").Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { findByIdAndUpdate } = require("./books.models");
const Book = require("./books.models");

const GET_TYPE = {
    all: async () => {
        return await Book.find({}).select("-__v");
    },
    id: async (id) => {
        return await Book.findById(id).select("-__v");
    },
    category: async (category) => {
        return await Book.findB({ category }).select("-__v");
    },
};

router.get("/get_book/all", async (req, res, next) => {
    try {
        const books = await GET_TYPE.all();

        res.status(200).json(books);
    } catch (err) {
        return next(new Error(err.message));
    }
});

router.get("/get_book/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            throw new Error("Please give proper book id");
        }

        if (!ObjectId.isValid(id)) {
            throw new Error("Please give proper book id");
        }

        const books = await GET_TYPE.id(id);

        res.status(200).json(books);
    } catch (err) {
        return next(new Error(err.message));
    }
});

router.get("/get_book/:category", async (req, res, next) => {
    try {
        const { category } = req.params;

        if (!category) {
            throw new Error("Please give proper book category");
        }

        const books = await GET_TYPE.category(category);

        res.status(200).json(books);
    } catch (err) {
        return next(new Error(err.message));
    }
});

router.post("/add_book", async (req, res, next) => {
    try {
        const book = new Book(req.body);

        const doc = await book.save();

        res.status(200).json(doc);
    } catch (err) {
        return next(new Error(err.message));
    }
});

router.put("/update_book", async (req, res, next) => {
    try {
        const { id, update } = req.body;

        if (!id || !ObjectId.isValid(id) || !update) {
            throw new Error("Please give proper book id");
        }

        const updatedDoc = await Book.findByIdAndUpdate(id, update, {
            new: true,
        });

        res.status(200).json(updatedDoc);
    } catch (err) {
        return next(new Error(err.message));
    }
});

router.delete("/delete_book", async (req, res, next) => {
    try {
        const { id } = req.body;

        if (!id || !ObjectId.isValid(id)) {
            throw new Error("Please give proper book id");
        }

        const deleteAck = await Book.findByIdAndDelete(id);

        const isDel = !!deleteAck;

        if (!isDel) {
            throw new Error("No such document with provided id exist");
        }

        res.status(200).json({
            deletedDoc: deleteAck,
            message: "The document was deleted succesfully",
        });
    } catch (err) {
        return next(new Error(err.message));
    }
});

module.exports = router;
