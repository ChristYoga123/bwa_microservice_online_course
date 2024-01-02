const bcrypt = require("bcrypt")
const { PrismaClient } = require('@prisma/client')
const { registerValidator } = require("../validation")
const prisma = new PrismaClient()
const { success, error } = require("../helpers")

async function register(req, res) 
{
    try
    {
        const data = {
            name: req.body.name,
            profession: req.body.profession,
            email: req.body.email,
            password: req.body.password,
        }
        await registerValidator(data)
        data.password = bcrypt.hashSync(data.password, 10)
        const newUser = await prisma.user.create({data: data})
        // hide password
        delete newUser.password
        return res.status(201).json(success("User created", newUser))
    } catch(err)
    {
        return res.status(500).json({
            status: "error",
            message: err.message
        })
    }
}

module.exports = {
    register
}