const userAdapter= require("./../adapter");
const { URL_USER_SERVICE } = process.env;
const userApi = userAdapter(URL_USER_SERVICE);

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

module.exports = {
    register
}