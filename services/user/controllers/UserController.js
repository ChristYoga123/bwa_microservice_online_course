const bcrypt = require("bcrypt")
const { PrismaClient } = require('@prisma/client')
const { registerValidator, loginValidator, updateProfileValidator } = require("../validation")
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
        try{
            await registerValidator(data)
        }catch(err){
            return res.status(400).json(error(400, err.message))
        }
        data.password = bcrypt.hashSync(data.password, 10)
        const newUser = await prisma.user.create({
            data: data,
            select: {id: true, name: true, profession: true, avatar: true, email: true}
        })
        return res.status(201).json(success(201, "User created", newUser))
    } catch(err)
    {
        return res.status(500).json(error(500, err.message))
    }
}

async function login(req, res)
{
    try
    {
        const data = {
            email: req.body.email,
            password: req.body.password
        }
        try
        {
            await loginValidator(data)
        }catch(err)
        {
            return res.status(400).json(error(400, err.message))
        }
        const user = await prisma.user.findUnique({
            where: {email: data.email},
            select: {id: true, name: true, profession: true, avatar: true, email: true, password: true}
        })
        const passwordMatch = bcrypt.compareSync(data.password, user.password)
        if(!user || !passwordMatch) return res.status(404).json(error(404, "Email or password is wrong"))
        // hide password
        delete user.password
        return res.status(200).json(success(200, "Login success", user))
    } catch(err)
    {
        return res.status(500).json(error(500, err.message))
    }
}

async function updateProfile(req, res)
{
    try
    {
        const data = {
            name: req.body.name,
            avatar: req.body.avatar,
            profession: req.body.profession,
            email: req.body.email,
            password: req.body.password,
        }
        const id = req.params.id
        const user = await prisma.user.findUnique({where: {id: parseInt(id)}})
        if(!user) return res.status(404).json(error(404, "User not found"))
        // joivalidator
        try
        {
            await updateProfileValidator(data)
        }catch(err)
        {
            return res.status(400).json(error(400, err.message))
        }
        // unique validator
        if(data.email)
        {
            const emailExist = await prisma.user.findUnique({where: {email: data.email}})
            if(emailExist && data.email != user.email) return res.status(400).json(error(400, "Email already exists"))
        }
        if(data.name)
        {
            const nameExist = await prisma.user.findUnique({where: {name: data.name}})
            if(nameExist && data.name != user.name) return res.status(400).json(error(400, "Name already exists"))
        }
        data.password = bcrypt.hashSync(data.password, 10)
        const updatedUser = await prisma.user.update({
            where: {id: parseInt(id)}, 
            data: data, 
            select: {id: true, name: true, profession: true, avatar: true, email: true}
        })
        return res.status(200).json(success(200, "User updated", updatedUser))
    } catch(err)
    {
        return res.status(500).json(error(500, err.message))
    }

}

module.exports = {
    register,
    login,
    updateProfile
}