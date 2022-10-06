import express from "express";
import dotenv from "dotenv"
import router from "./routes/routes";
dotenv.config()

const app:express.Application = express()

app.use(express.json())
app.use(router)


app.listen(process.env.PORT,() => {
   console.log(`Server is runing at ${process.env.PORT}`)
})