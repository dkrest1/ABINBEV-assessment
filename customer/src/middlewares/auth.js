import Customer from "../models/customer.model.js"
import { generatePayloadFromToken } from "../utils/helper.utils.js"

const auth = async (req, res, next) => {
    let token
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // get token from headers
            token = req.headers.authorization.split(" ")[1]
            //get payload from token
            const decoded = generatePayloadFromToken(token.id)
            // get user from token
            req.user = Customer.findByPk(decoded.id).select("-password")
            next()
        } catch (error) {
            return res.status(401).json({ message: "Not authorized!" })
        }
    }
    if (!token) {
        return res.status(401).json({ message: "Unauthorized!" })
    }
}

export default auth