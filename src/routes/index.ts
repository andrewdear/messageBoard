import { Application} from "express"
import messageRoutes from "./message.routes"

// this is pulled out for ease of future expansion
export default (app : Application) => {
    messageRoutes(app);
}