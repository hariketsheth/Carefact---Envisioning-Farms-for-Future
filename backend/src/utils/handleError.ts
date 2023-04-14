import { Request, Response } from 'express';

export const handleError = (cause: string, details: any, req: Request, res: Response) => {
    return res.status(400).json({
        message: cause,
        details,
        sentParameters: req.body,
    });
};
