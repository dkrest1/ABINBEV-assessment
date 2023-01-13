// const redis = require('redis');

const authMiddleware = async (
    req,
    res,
    next
) => {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer')
        )
            throw new Error('You need to Login first To access this route//401')

        const token = req.headers.authorization.split(' ')[1]
        if (!token) throw new Error('Not authorized to access this route')

        //fetch user from redis
        // const user = await User.findByToken(token)
        // if (!user) throw new Error('Invalid User Found in Token')

        req.body.user = user
        next()
    } catch (error) {
        handleError(error, res)
    }
}