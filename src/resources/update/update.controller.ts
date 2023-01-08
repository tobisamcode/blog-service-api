import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from './update.validation';
import UpdateService from '@/resources/update/update.service';

class UpdateController implements Controller {
    public path = '/posts/:id';
    public router = Router();
    private UpdateService = new UpdateService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.patch(
            `${this.path}`,
            validationMiddleware(validate.update),
            this.update
        );
    }

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

            const updatedPost = await this.UpdateService.update(id, body);

            if (!updatedPost) {
                return res.status(404).json({ error: 'No such post' });
            }

            return res.json({ message: 'successfully updated!', updatedPost });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default UpdateController;
