import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const generatePayloadFromToken = (token) => {
    const salt = process.env.TOKEN_SECRET || 'secret'
    const payload = jwt.verify(token, salt)
    return payload;
}

export const generateTokenFromPayload = (payload) => {
    const salt = process.env.TOKEN_SECRET || 'secret'
    const token = jwt.sign(payload, salt)
    return token;
}

export const passwordToHash = (password) => {
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    return hashedPassword
}

export const compareBcryptPassword = (suppliedPassword, storedPassword) => {
    return bcrypt.compareSync(
        suppliedPassword,
        storedPassword
    )
}

