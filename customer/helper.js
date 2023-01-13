const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function generatePayloadFromToken(token) {
    const salt = process.env.TOKEN_SECRET || 'secret'
    const payload = jwt.verify(token, salt)
    return payload;
}

function generateTokenFromPayload(payload) {
    const salt = process.env.TOKEN_SECRET || 'secret'
    const token = jwt.sign(payload, salt)
    return token;
}

function passwordToHash(password) {
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    return hashedPassword
}

function compareBcryptPassword(
    suppliedPassword,
    storedPassword
) {
    return bcrypt.compareSync(
        suppliedPassword,
        storedPassword
    )
}

module.exports = {
    generatePayloadFromToken,
    generateTokenFromPayload,
    passwordToHash,
    compareBcryptPassword
}