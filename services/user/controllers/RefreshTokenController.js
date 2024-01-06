const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { RefreshTokenValidator } = require('../validation/RefreshTokenValidator');
const {success, error} = require("./../helpers")

async function storeToken(req, res)
{
    const { token, user_id } = req.body;
    try
    {
        await RefreshTokenValidator({ token, user_id });
    }catch (err)
    {
        return res.status(400).json(error(400, err.message));
    }
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(user_id)
        }
    });
    if(!user)
    {
        return res.status(404).json(error(404, "User not found"));
    }
    const refreshToken = await prisma.refreshToken.create({
        data: {
            token,
            user_id
        }
    });

    return res.status(201).json(success(201, "Refresh token stored", refreshToken));
}

async function getToken(req, res)
{
    const refresh_token = req.query.refresh_token;
    const refreshToken = await prisma.refreshToken.findFirst({
        where: {
            token: refresh_token
        }
    });
    if(!refreshToken)
    {
        return res.status(404).json(error(404, "Refresh token not found"));
    }
    return res.status(200).json(success(200, "Refresh token", refreshToken));
}

module.exports = {
    storeToken,
    getToken
}