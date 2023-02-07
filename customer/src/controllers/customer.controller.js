import Joi from "joi"
import {
    generateTokenFromPayload,
    passwordToHash,
    compareBcryptPassword

} from "../utils/helper.utils.js";
import Customer from "../models/customer.model.js";



//@signup controller
//@public route 
export const signUp = async (req, res) => {
    //collect user data
    const { full_name, email, password } = req.body
    // validate user input
    const schema = Joi.object().keys({
        full_name: Joi.string().required(),
        email: Joi.string().email().required(),
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

        //generate token
        const token = generateTokenFromPayload(user.id)

        return res.status(201).json({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            token
        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

//signin controller
export const signIn = async (req, res) => {
    //collect user data
    const { email, password } = req.body
    //validate user data
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error } = schema.validate({ email, password })
    if (error) {
        return res.status(400).json({
            message: error.message
        })
    }

    //check if user exist
    try {
        const user = await Customer.findOne({ where: { email: email } })
        if (!user) {
            return res.status(400).json({
                message: "User doesn't exist!"
            })
        }

        // validate user password
        const passwordCorrect = compareBcryptPassword(password, user.password)
        if (!passwordCorrect) {
            res.status(400).json({
                message: "Invalid User Credentials!"
            })
        }

        return res.status(200).json({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            token: generateTokenFromPayload(user.id)

        })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}