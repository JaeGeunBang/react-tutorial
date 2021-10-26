"use strict";
exports.__esModule = true;
var express_1 = require("express");
var morgan_1 = require("morgan");
var cors_1 = require("cors");
var express_session_1 = require("express-session");
var hpp_1 = require("hpp");
var helmet_1 = require("helmet");
var cookie_parser_1 = require("cookie-parser");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var prod = process.env.NODE_ENV === 'production';
if (prod) {
    app.use((0, hpp_1["default"])());
    app.use((0, helmet_1["default"])());
    app.use((0, morgan_1["default"])('combined'));
    app.use((0, cors_1["default"])({
        origin: /nodebird\.com$/,
        credentials: true
    }));
}
else {
    app.use((0, morgan_1["default"])('combined'));
    app.use((0, cors_1["default"])({
        origin: true,
        credentials: true
    }));
}
app.use('/', express_1["default"].static('uploads'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cookie_parser_1["default"])(process.env.COOKIE_SECRET));
app.use((0, express_session_1["default"])({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: prod ? '.nodebird.com' : undefined
    }
}));
app.set('port', prod ? process.env.PORT : 3065);
app.get('/', function (req, res, next) {
    res.send('react nodebird 백엔드 정상 동작!');
});
app.listen(app.get('port'), function () {
    console.log("server is running on " + process.env.PORT);
});
