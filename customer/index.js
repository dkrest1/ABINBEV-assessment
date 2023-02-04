import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./src/config/dbConfig.js"
import router from "./src/routes/customer.route.js"


const app = express()
dotenv.config()

const port = process.env.PORT

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

//testing server
app.get("/", (req, res) => {
    res.send("app is live")
})

//using routes
app.use("/customer/", router)


app.listen(port || 8080, async () => {
    console.log(`app is live on port ${port}`)
    await connectDB()
})
