import { NextFunction, Request, Response } from "express";
import { secretKey } from "../config/env";
import jwt from "jsonwebtoken"
import { db } from "../config/db";

interface TokenData {
  userId: number
  iat: number
  exp: number
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header required' })
  }

  const token = authHeader.split(' ')[1]

  try {
    if (!secretKey) {
      return res.json({ error: "Erro interno, por favor entre em contato com o SUPORTE" })
    }

    const decodedToken = jwt.verify(token, secretKey) as TokenData
    
    const query = `SELECT id, name FROM users where id = $1`
    const result = await db.query(query, [decodedToken.userId])

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid user' })
    }

    const user = result.rows[0]

    req.authenticatedUser = user

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}