import Joi from "joi"
import {
    passwordToHash,
} from "../utils/helper.utils.js";
import Order from "../models/order.model.js";

// create order controller - protected route
export const createOrder = async (req, res) => {
    //collect user data
    const { price, order_status } = req.body
    // validate user input
    const schema = Joi.object().keys({
        price: Joi.number().precision(2).required(),
        order_status: Joi.string(),
    })

    const { error } = schema.validate({})

    if (error) {
        return res.status(400).json({
            message: error.message
        })
    }
    /////////////////////////////////////////////////////////
    //check if user exit
    try {
        const oldUser = await Order.findOne({ where: { email: email } })
        if (oldUser) {
            return res.status(400).json({ message: "User alreay exist!" })
        }

        //hash user password
        const hashedpassword = passwordToHash(password)
        //create user
        const user = await Customer.create({
            full_name,
            email,
            password: hashedpassword
        })

        return res.status(201).json({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
        })
    } catch (error) {
        console.log(error)
    }
}

//update order Controller
export const updateOrder = async (req, res) => {
    return res.status(200).json({ message: "Hello order!" })
}