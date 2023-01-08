import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import DeleteService from '@/resources/delete/delete.service';

class DeleteController implements Controller {
    public path = '/posts/:id';
    public router = Router();
    private DeleteService = new DeleteService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.delete(`${this.path}`, this.get);
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | any> => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: 'no such post' });
            }

            const post = await this.DeleteService.delete(id);

            return res.status(200).json({ message: 'success', post });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default DeleteController;
