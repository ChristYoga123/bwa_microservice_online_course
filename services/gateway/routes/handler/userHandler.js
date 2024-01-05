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

async function updateProfile(req, res) {
    try {
        const id = req.user.data.id;
        const user = await userApi.put(`/${id}/profile`, req.body);
        return res.json(user.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
        return res.status(500).json({ status: "error", message: "service unavailable" });
        }

        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

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

        await refreshTokenApi.get("?refresh_token=" + refreshToken)

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
        if (err.response) {
            return res.status(400).json(err.response.data)
        }
        return res.status(500).json({
            meta: {
                status: "error",
                code: 500,
                message: err.message
            }
        })
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    updateProfile
}