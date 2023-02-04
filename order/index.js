import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import { connectDB } from "./src/config/dbconfig.js"

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const port = process.env.PORT

app.get("/", (req, res) => {
    res.send("welcome")
})

app.listen(port, async () => {
    console.log(`app is live on ${port}`)
    await connectDB()
})