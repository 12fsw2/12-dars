const jwt = require("jsonwebtoken")

const access_token = (payload) => {
    return jwt.sign(payload, process.env.SEKRET_KEY, {expiresIn: "1d"})
}

const refresh_token = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SEKRET_KEY, {expiresIn: "60d"})
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.SEKRET_KEY)
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_SEKRET_KEY)
}

module.exports = {
    access_token,
    refresh_token,
    verifyAccessToken,
    verifyRefreshToken
}