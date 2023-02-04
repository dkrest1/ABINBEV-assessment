import express from "express"
const router = express.Router()
import {
    signUp,
    signIn
} from "../controllers/customer.controller.js"

//create route
router.post("/signup", signUp)
//login route
router.post("/signin", signIn)


export default router