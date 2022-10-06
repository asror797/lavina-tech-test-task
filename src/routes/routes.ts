import { Router } from "express"
import booksController from "../controllers/books.controller";


const router = Router()


router
      .get('/books',booksController.GET)
      .get('/add/:isbn',booksController.ADD_NEW_BOOK)


export default router;