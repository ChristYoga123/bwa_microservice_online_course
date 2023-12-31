const isBase64 = require("is-base64");
const base64Img = require("base64-img")
const {success, error} = require("../helpers/ResponseFormatter");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

async function store(req, res) {
    const image = req.body.image;
    if(!isBase64(image, {mimeRequired: true}))
    {
        return res.status(400).json(error(400, "Image must be base64 format"));
    }
    base64Img.img(image, "./public/images", Date.now(), async (err, filepath) => {
        if(err)
        {
            return res.status(400).json(error(400, err.message));
        }
        const filename = filepath.split("\\").pop().split("/").pop();
        const data = await prisma.media.create({
            data: {
                image: `images/${filename}`
            }
        })
        return res.json(success(200, "Image uploaded successfully", data));
    })
}

async function index(req, res) {
    const data = await prisma.media.findMany();
    return res.json(success(200, "Media retrieved successfully", data));
}

async function destroy(req, res) {
    const id = req.params.id;
    const image = await prisma.media.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if(!image)
    {
        return res.status(404).json(error(404, "Image not found"));
    }
    fs.unlink(`./public/${image.image}`, async (err) => {
        if(err)
        {
            return res.status(400).json(error(400, err.message));
        }
        await prisma.media.delete({
            where: {
                id: parseInt(id)
            }
        })
        return res.json(success(200, "Image deleted successfully"));
    })
}

module.exports = {
    store,
    index,
    destroy
}