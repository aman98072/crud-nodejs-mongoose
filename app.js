require("dotenv").config(); // load enviorment 
require("./config/database"); // Database load

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const session = require('express-session');

// Session initilize 
app.use(session({
    secret: 'j4fDEmVaCXnhJbah',
    resave: false,
    saveUninitialized: true
}));

// Dynamic Helpers for passing session in pug template
app.use( (req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Routes
var crudRoute = require("./routes/crud");
var authRoute = require("./routes/auth");
var { isLogined } = require("./controllers/login");


// Middleware
app.set('view engine', 'pug');
app.set('view options', { layout: 'layout' });

app.use(bodyParser.urlencoded({ extended: false })); // for browser purpose we use it parse body data into JSON
app.use(bodyParser.json()); // Parse body data into JSON
app.use(cors());

app.use("/", authRoute);
app.use("/crud", isLogined, crudRoute);


app.listen(port, () => {
    console.log(`Node is running on port ${port}`);
});
