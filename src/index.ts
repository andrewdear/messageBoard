import express, {Application} from "express"
import "dotenv/config"
import bodyParser from "body-parser"
import routes from "./routes"
import connectDB from "./connect"

const app: Application = express()

app.use(bodyParser.json())

const PORT: number = process.env.PORT ?  parseInt(process.env.PORT) : 8080;

let db = "mongodb://mongo:27017/prod";

if(process.env.DEV) db = "mongodb://0.0.0.0:27017/dev";
if(process.env.TEST) db = "mongodb://0.0.0.0:27017/test";

connectDB(db)

routes(app)

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})