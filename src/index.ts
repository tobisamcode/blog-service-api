import 'dotenv/config';
import 'module-alias/register';
import App from './server';

import validateEnv from '@/utils/validateEnv';
import PostController from '@/resources/post/post.controller';
import GetController from '@/resources/get/get.controller';
import GetByIdController from '@/resources/getById/getbyid.controller';
import DeleteController from '@/resources/delete/delete.controller';
import UpdateController from '@/resources/update/update.controller';
import UserController from '@/resources/user/user.controller';

validateEnv();

const app = new App(
    [
        new PostController(),
        new GetController(),
        new GetByIdController(),
        new DeleteController(),
        new UpdateController(),
        new UserController(),
    ],
    Number(process.env.PORT)
);

app.listen();
