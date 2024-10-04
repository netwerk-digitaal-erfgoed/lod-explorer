import { Request, Response } from "express";

function NotFoundMiddleware(req: Request, res: Response) {
    res.status(404).json({message: 'route does not exist'});
    return;
}

export default NotFoundMiddleware;