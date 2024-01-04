const jwt = require("jsonwebtoken")
const refreshTokenAdapter = require("../adapter")
const {
    URL_REFRESH_TOKEN_SERVICE,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRED
} = process.env
const refreshTokenApi = refreshTokenAdapter(URL_REFRESH_TOKEN_SERVICE)

async function refreshToken(req, res) {
    try {
        const refreshToken = req.body.refresh_token
        const email = req.body.email

        if(!refreshToken || !email) {
            return res.status(400).json({
                meta: {
                    status: "error",
                    code: 400,
                    message: "invalid token"
                }
            })
        }

        await refreshTokenApi.get("/?refresh_token=" + refreshToken)

        jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: err.message })
            } 
            if (email !== decoded.data.email) {
                return res.status(403).json({ message: "email is not valid" })
            }
        })

        const token = jwt.sign({ data: { email } }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })
        return res.json({
            meta: {
                status: "success",
                code: 200,
                message: "success"
            },
            data: {
                token
            }
        })

    } catch (err) {
        
    }
}

module.exports = {
    refreshToken
}