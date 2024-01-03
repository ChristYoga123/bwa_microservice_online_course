const Joi = require('joi');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const uniqueEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (user) {
        throw new Error("Email already exists");
    }
    return true;
}

const registerValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        profession: Joi.string().min(3),
        email: Joi.string().email().required().external(uniqueEmail),
        password: Joi.string().min(6).required(),
    });

    return schema.validateAsync(data);
}

const loginValidator = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return schema.validateAsync(data);
}

const updateProfileValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        profession: Joi.string().min(3),
        avatar: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    return schema.validateAsync(data);
}

module.exports = {
    registerValidator,
    loginValidator,
    updateProfileValidator
}