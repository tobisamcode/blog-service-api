import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),

    body: Joi.string().required(),
});

const update = Joi.object({
    title: Joi.string().optional(),

    body: Joi.string().optional(),
});

export default { create, update };
