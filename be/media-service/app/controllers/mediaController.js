const {PrismaClient} = require("@prisma/client");
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const { error, success } = require('../helpers/responseHelper');
const prisma = new PrismaClient();

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

module.exports = {
    store
}