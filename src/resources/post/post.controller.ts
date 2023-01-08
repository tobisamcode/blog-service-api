import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';
import authenticated from '@/middleware/authenticated.middleware';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();
    public Type = mongoose.Types.ObjectId;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            authenticated,
            this.create
        );

        this.router.get(`${this.path}`, authenticated, this.get);

        this.router.get(`${this.path}/:id`, authenticated, this.getById);

        this.router.patch(
            `${this.path}/:id`,
            validationMiddleware(validate.update),
            authenticated,
            this.update
        );

        this.router.delete(`${this.path}/:id`, authenticated, this.delete);
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | any> => {
        try {
            const posts = await this.PostService.get();

            return res.status(200).json({ posts });
        } catch (error) {
            next(new HttpException(404, 'cannot get posts, try again!'));
        }
    };

    private getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | any> => {
        try {
            const { id } = req.params;

            if (!this.Type.isValid(id)) {
                return res.status(404).json({ error: 'no such post' });
            }

            const post = await this.PostService.getById(id);

            return res.status(200).json({ post });
        } catch (error) {
            next(new HttpException(404, 'cannot get posts, try again!'));
        }
    };

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | undefined> => {
        try {
            const { title, body } = req.body;
            const post = await this.PostService.create(title, body);

            return res.status(201).json({ post });
        } catch (error) {
            next(new HttpException(400, 'Cannot create post'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | any> => {
        try {
            const { id } = req.params;
            const { body } = req;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: 'no such post' });
            }

            const updatedPost = await this.PostService.update(id, body);

            if (!updatedPost) {
                return res.status(404).json({ error: 'No such post' });
            }

            return res.json({ message: 'successfully updated!', updatedPost });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | any> => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: 'no such post' });
            }

            const post = await this.PostService.delete(id);

            return res.status(200).json({ message: 'success', post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default PostController;
