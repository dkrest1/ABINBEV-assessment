import Joi from "joi"
import {
    generateTokenFromPayload,
    passwordToHash,
    compareBcryptPassword

} from "../utils/helper.utils.js";
import Order from "../models/order.model.js";


export const signUp = async (req, res) => {
    //collect user data
    const { full_name, email, password } = req.body
    // validate user input
    const schema = Joi.object().keys({
        full_name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    const { error } = schema.validate({ full_name, email, password })

    if (error) {
        return res.status(400).json({
            message: error.message
        })
    }
    //check if user exit
    try {
        const oldUser = await Customer.findOne({ where: { email: email } })
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


    //generate token

}
