import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import GetService from '@/resources/get/get.service';

class GetController implements Controller {
    public path = '/posts';
    public router = Router();
    private GetService = new GetService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(`${this.path}`, this.get);
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | any> => {
        try {
            const posts = await this.GetService.get();

            return res.status(200).json({ posts });
        } catch (error) {
            next(new HttpException(404, 'cannot get posts, try again!'));
        }
    };
}

export default GetController;
