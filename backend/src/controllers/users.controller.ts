import { Request, Response } from "express";
import { db } from "../db";

export async function getAllUsers(req: Request, res: Response) {
  const { rows } = await db.query(`SELECT * FROM users;`);
  return res.json(rows);
}