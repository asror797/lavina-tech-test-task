import axios from "axios";
import {  Request, Response } from "express";
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
   GET_BY_ID:async(req:Request,res:Response) => {
      try {
         const book = await dataSource.getRepository(Books).findOne({
            where:{
               id:req.params.id
            }
         })

         if(!book) {
            res.json({
               message:"Not found this book"
            })
         }else {
            res.json(book)
         }

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   ADD_NEW_BOOK:async(req:Request, res:Response) => {
      try {
         const isbn = req.params.isbn

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
               message:`NotFoundBook`
            })
         }

      } catch (error) {
         console.log(error)
         res.sendStatus(404)
      }
   },
   DELETE:async(req:Request,res:Response) => {
      try {
         const isbn = req.params.isbn

         const { raw } = await dataSource
                        .createQueryBuilder()
                        .delete()
                        .from(Books)
                        .where("isbn=:isbn",{isbn:isbn})  
                        .returning('*')
                        .execute()

         res.json(raw[0])
      } catch (error) {
         console.log(error)
         res.status(500).json({
            status:500,
            message:"InternalServerError"
         })

      }
   },
   CHANGE_STATUS:async(req:Request,res:Response) => {
      try {
         const { id , status } = req.body

         const STATUS = parseInt(status)
         const { raw } = await dataSource
                        .createQueryBuilder()
                        .update(Books)
                        .set({status:STATUS})
                        .where("id=:id",{id:id})
                        .returning('*')
                        .execute()

         res.json(raw[0])
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }
}