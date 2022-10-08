"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_controller_1 = __importDefault(require("../controllers/books.controller"));
const router = (0, express_1.Router)();
router
    .get('/books', books_controller_1.default.GET)
    .get('/add/:isbn', books_controller_1.default.ADD_NEW_BOOK)
    .put('/update', books_controller_1.default.CHANGE_STATUS)
    .delete('/:isbn', books_controller_1.default.DELETE);
exports.default = router;
