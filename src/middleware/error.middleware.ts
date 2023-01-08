import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

function ErrorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
): Response {
    const status = error.status || 500;
    const message = error.message || 'something went wrong';
    return res.status(status).json({
        error: message,
    });
}

export default ErrorMiddleware;
