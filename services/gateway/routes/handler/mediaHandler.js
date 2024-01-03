const mediaAdapter= require("./../adapter");
const { URL_MEDIA_SERVICE } = process.env;
const mediaApi = mediaAdapter(URL_MEDIA_SERVICE);

async function store(req, res) {
  try {
    const media = await mediaApi.post("/", req.body);
    return res.json(media.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({ status: "error", message: "service unavailable" });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}

async function all(req, res) {
  try {
    const media = await mediaApi.get("/", req.body);
    return res.json(media.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res.status(500).json({ status: "error", message: "service unavailable" });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
}

async function destroy(req, res) {
    try {
        const media = await mediaApi.delete(`/${req.params.id}`);
        return res.json(media.data);
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
        return res.status(500).json({ status: "error", message: "service unavailable" });
        }
    
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

module.exports = {
    store,
    all,
    destroy
};