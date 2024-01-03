const Joi = require('joi');

const RefreshTokenValidator = (data) => 
{
    const schema = Joi.object({
        user_id: Joi.number().required(),
        token: Joi.string().required(),
    });

    return schema.validateAsync(data);
}

module.exports = {
    RefreshTokenValidator
}