import { Router } from "express"
import booksController from "../controllers/books.controller";


const router = Router()


router
      .get('/books',booksController.GET)
      .get('/book/:id',booksController.GET_BY_ID)
      .get('/add/:isbn',booksController.ADD_NEW_BOOK)
      .put('/update',booksController.CHANGE_STATUS)
      .delete('/delete/:isbn',booksController.DELETE)


export default router;