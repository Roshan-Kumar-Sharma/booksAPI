const router = require("express").Router();

const bookRouter = require("./books/books.routes");

router.use(bookRouter);

module.exports = router;
