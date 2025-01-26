import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors"
import path from "path";
import fs from "fs"
import * as YAML from "yaml";
import "reflect-metadata"
import "dotenv/config"
import { ErrorHandlerMiddleware } from "./middlewares";
import { appDataSource } from "./config/typeorm.config";
import router from "./routes";
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

const swaggerFilePath = path.resolve(__dirname, "../swagger.yaml")
const swaggerDocument = YAML.parse(fs.readFileSync(swaggerFilePath, "utf-8"))
app.use("/welbex/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/*", ErrorHandlerMiddleware.errorHandlerMiddleware)
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server run on port: ${port}`)
})


