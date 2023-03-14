const express = require("express");

const productRouter = require('./routes/productRoutes');

const directoryRouter = require('./routes/directoryRoutes');

const app = express();

app.use(express.json());

app.use((req,res,next) => {
    console.log("Hello from middleware!!");
    next();
});

app.use((req,res,next) =>{
    req.requestTime = new Date().toISOString();
    next();
})

app.use("/api/items", productRouter);
app.use("/api/directory", directoryRouter);

module.exports = app;