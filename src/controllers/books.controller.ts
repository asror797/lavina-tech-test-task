import axios from "axios";
import { Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Books } from "../entities/books.entity";


export default {
   GET:async(req:Request , res: Response) => {
      try {
         const books = await dataSource.getRepository(Books).find()
         res.json(books)
      } catch (error) {
         console.log('error')
         res.sendStatus(500)
      }
   },
   ADD_NEW_BOOK:async(req:Request, res:Response) => {
      try {
         const isbn = req.params.isbn
         console.log(isbn)

         try {
            const response = await axios.get(`https://openlibrary.org/books/${isbn}.json`)

            const { raw } = await dataSource
                        .createQueryBuilder()
                        .insert()
                        .into(Books)
                        .values({
                           title:response.data.title,
                           number_of_pages:response.data.number_of_pages,
                           publish_date:response.data.publish_date,
                           isbn:isbn
                        })
                        .returning('*')
                        .execute()

            res.json(raw[0])

         } catch (error) {
            console.log(error)
            res.json({
               message:`Not found this ${isbn}`
            })
         }

      } catch (error) {
         console.log(error)
         res.sendStatus(404)
      }
   }
}