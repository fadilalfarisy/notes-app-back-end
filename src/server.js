import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import router from './routes.js'
import cors from 'cors'

dotenv.config()
const app = express()

//enable cors returned (Access-Control-Allow-Origin: *)
app.use(cors())
//for parsing application/json
app.use(bodyParser.json())
//for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use(router)

const PORT = process.env.NODE_ENV == 'production' ? process.env.PORT : 5000
const HOST = process.env.NODE_ENV == 'production' ? '0.0.0.0' : 'localhost'

app.listen(PORT, HOST, () => {
    console.log(`server running on port ${PORT}`)
})
