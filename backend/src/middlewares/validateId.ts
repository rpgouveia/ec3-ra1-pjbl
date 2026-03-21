import type { Request, Response, NextFunction } from "express";

export const validateId = (request: Request, response: Response, next: NextFunction) => {
    const id = Number(request.params.id);

    if (isNaN(id)) {
        response.status(400).json({ error: "ID inválido." });
        return;
    }

    request.body.validatedId = id;
    next();
};