const express = require("express");
require("./configs/db.configs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiV1Router = require("./api/v1/apiV1.routes");

app.use(apiV1Router);

app.use((err, req, res, next) => {
    const statusCode = err.status || err.code || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: err.message || "Something Went Wrong",
        data: err || {},
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server is running at PORT:::::: ", PORT);
});
