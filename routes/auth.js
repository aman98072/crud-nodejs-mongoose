const express = require("express");
const router = express.Router();
const { view, create } = require("../controllers/register");
const { viewLogin, login } = require("../controllers/login");

const logined = (req, res, next) => {
    let token = req.session.token;
    if (token) {
        res.redirect("/crud/list");
    } 

    next();
}

// register router
router.get("/register", logined, view);
router.post("/register/create", logined, create);

// login router
router.get("/login", logined, viewLogin);
router.post("/login/check", logined, login);

// logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;