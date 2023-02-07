import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./src/routers/order.route.js"
import { connectDB } from "./src/config/dbconfig.js"
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const port = process.env.PORT

app.get("/", (req, res) => {
    res.send("welcome to order!")
})

// configure route
app.use("/order", router)

app.listen(port, async () => {
    console.log(`app is live on ${port}`)
    await connectDB()
})