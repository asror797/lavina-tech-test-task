"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const typeorm_1 = require("typeorm");
let Books = class Books {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
], Books.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
        nullable: false
    })
], Books.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 64,
        nullable: false
    })
], Books.prototype, "publish_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        nullable: false
    })
], Books.prototype, "number_of_pages", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "integer",
        default: 0,
        nullable: false
    })
], Books.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 32,
        nullable: false
    })
], Books.prototype, "isbn", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], Books.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)()
], Books.prototype, "updated_at", void 0);
Books = __decorate([
    (0, typeorm_1.Entity)({
        name: "books"
    })
], Books);
exports.Books = Books;
