import Joi from 'joi';

const update = Joi.object({
    title: Joi.string().optional(),

    body: Joi.string().optional(),
});

export default { update };
