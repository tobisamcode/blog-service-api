import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import GetByIdService from '@/resources/getById/getbyid.service';

class GetByIdController implements Controller {
    public path = '/posts/:id';
    public router = Router();
    private GetByIdService = new GetByIdService();

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
            const { id } = req.params;

            const post = await this.GetByIdService.get(id);

            return res.status(200).json({ post });
        } catch (error) {
            next(new HttpException(404, 'cannot get posts, try again!'));
        }
    };
}

export default GetByIdController;
