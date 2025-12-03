import { NextFunction, Request, Response } from "express";

export function validateId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const numericId = Number(id)

  if(!id || isNaN(numericId)) {
    return res.status(400).json({
      message: "ID inválido. O ID precisa ser um numero!"
    })
  }

  next()
}           