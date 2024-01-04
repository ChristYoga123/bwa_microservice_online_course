const userAdapter= require("./../adapter");
const { 
    URL_USER_SERVICE, 
    URL_REFRESH_TOKEN_SERVICE,
    JWT_SECRET, 
    JWT_SECRET_REFRESH_TOKEN, 
    JWT_ACCESS_TOKEN_EXPIRED, 
    JWT_REFRESH_TOKEN_EXPIRED 
} = process.env;
const jwt = require("jsonwebtoken");
const userApi = userAdapter(URL_USER_SERVICE);
const refreshTokenApi = userAdapter(URL_REFRESH_TOKEN_SERVICE);

async function register(req, res) {
    try {
        const user = await userApi.post("/auth/register", req.body);
        return res.json(user.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(500).json({ status: "error", message: "service unavailable" });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

async function login(req, res) {
    try {
        const user = await userApi.post("/auth/login", req.body);
        const data = user.data.data;
        const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
        const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });
        console.log(data.id);
        await refreshTokenApi.post("/", { token: refreshToken, user_id: data.id });

        return res.json({
            meta: {
                status: "success",
                code: 200,
                message: "login successfully"
            },
            data: {
                token,
                refresh_token: refreshToken
            }
        });
    } catch (err) {
        if (err.code === "ECONNREFUSED") {
        return res.status(500).json({ status: "error", message: "service unavailable" });
        }

        const { status, data } = err.response;
        return res.status(status).json(data);
    }
}

module.exports = {
    register,
    login
}