import express, { Application } from "express";
import { ErrorHandlerMiddleware } from "./middlewares";
import router from "./routes";
import "dotenv/config"
import "reflect-metadata"
import cors from "cors"
import { appDataSource } from "./config/typeorm.config";
const app: Application = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

appDataSource.initialize()
    .then(() => { console.log('Db connected successfully') })
    .catch((err) => { console.log(`Typeorm:${err}`) })


app.use(router)

app.use("/*", ErrorHandlerMiddleware.errorHandlerMiddleware)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server run on port: ${port}`)
})


