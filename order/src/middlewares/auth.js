import { generatePayloadFromToken } from "../utils/helper.utils"
import { Order } from "../models/order.model"


const auth = async (req, res, next) => {
    let token
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //generate token from payload
            token = req.headers.authorization.split(" ")[1]
            //generate user data from token
            const decoded = generatePayloadFromToken(token)
            // return user to req
            req.user = Order.findByPk(decoded.id)
            next()
        } catch (error) {
            return res.status(201).json({ message: "Not Authorized!" })
        }
    }
    if (!token) {
        return res.status(201).json({ message: "Unauthorized!" })
    }
}


export default auth