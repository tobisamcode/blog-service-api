import 'dotenv/config';
import 'module-alias/register';
import App from './server';

import validateEnv from '@/utils/validateEnv';
import PostController from '@/resources/post/post.controller';

validateEnv();

const app = new App([new PostController()], Number(process.env.PORT));

app.listen();
