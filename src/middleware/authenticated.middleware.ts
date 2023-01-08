import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/token';
import userModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import jwt from 'jsonwebtoken';

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    // verify authorization
    const { authorization } = req.headers;

    if (!authorization) {
        return next(new HttpException(401, 'Unauthorized'));
    }

    const token = authorization.split(' ')[1].trim();

    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(token);

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorized'));
        }

        const user = await userModel
            .findById(payload.id)
            .select('-password')
            .exec();

        if (!user) {
            return next(new HttpException(401, 'Unauthorized'));
        }

        req.user = user;

        return next();
    } catch (error) {
        return next(new HttpException(401, 'Unauthorized'));
    }
}

export default authenticatedMiddleware;
