const {PrismaClient} = require("@prisma/client");
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const { error, success } = require('../helpers/responseHelper');
const prisma = new PrismaClient();
const fs = require('fs');

async function store(req, res) {
    const {image} = req.body;
    if(!isBase64(image, {mimeRequired: true})) {
        return res.status(400).json(error(400, 'Image must be base64 and mime type is required'));
    }

    base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
        if(err) {
            return res.status(400).json(error(400, err.message));
        }

        const filename = filepath.split("\\").pop().split("/").pop();
        const newImage = await prisma.media.create({
            data: {
                image: `${req.get('host')}/images/${filename}`
            }
        })
        return res.status(201).json(success(201, 'Image successfully created', newImage));
    })
}

async function index(req, res) {
    const images = await prisma.media.findMany();
    return res.status(200).json(success(200, 'Image list', images));
}

async function destroy(req, res) {
    const {id} = req.params;
    const image = await prisma.media.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if(!image) {
        return res.status(404).json(error(404, 'Image not found'));
    }

    const imagePath = image.image.replace(`${req.get('host')}/`, '');
    fs.unlink(`./public/${imagePath}`, async (err) => {
        if(err) {
            return res.status(400).json(error(400, err.message));
        }

        await prisma.media.delete({
            where: {
                id: parseInt(id)
            }
        })
        return res.status(200).json(success(200, 'Image deleted'));
    })
}

module.exports = {
    store,
    index,
    destroy
}