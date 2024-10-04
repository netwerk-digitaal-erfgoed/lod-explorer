import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

function validateResult(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    next();
}

const ValidationResponse = {
    validateResult
}

export default ValidationResponse;