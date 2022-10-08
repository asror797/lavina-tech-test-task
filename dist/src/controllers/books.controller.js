"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ormconfig_1 = require("../config/ormconfig");
const books_entity_1 = require("../entities/books.entity");
exports.default = {
    GET: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const books = yield ormconfig_1.dataSource.getRepository(books_entity_1.Books).find();
            res.json(books);
        }
        catch (error) {
            console.log('error');
            res.sendStatus(500);
        }
    }),
    ADD_NEW_BOOK: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isbn = req.params.isbn;
            try {
                const response = yield axios_1.default.get(`https://openlibrary.org/books/${isbn}.json`);
                const { raw } = yield ormconfig_1.dataSource
                    .createQueryBuilder()
                    .insert()
                    .into(books_entity_1.Books)
                    .values({
                    title: response.data.title,
                    number_of_pages: response.data.number_of_pages,
                    publish_date: response.data.publish_date,
                    isbn: isbn
                })
                    .returning('*')
                    .execute();
                res.json(raw[0]);
            }
            catch (error) {
                console.log(error);
                res.json({
                    message: `Not found this ${isbn}`
                });
            }
        }
        catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
    }),
    DELETE: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isbn = req.params.isbn;
            const { raw } = yield ormconfig_1.dataSource
                .createQueryBuilder()
                .delete()
                .from(books_entity_1.Books)
                .where("isbn=:isbn", { isbn: isbn })
                .returning('*')
                .execute();
            res.json(raw[0]);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }),
    CHANGE_STATUS: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, status } = req.body;
            const { raw } = yield ormconfig_1.dataSource
                .createQueryBuilder()
                .update(books_entity_1.Books)
                .set({ status: status })
                .where("id=:id", { id: id })
                .returning('*')
                .execute();
            res.json(raw[0]);
        }
        catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    })
};
