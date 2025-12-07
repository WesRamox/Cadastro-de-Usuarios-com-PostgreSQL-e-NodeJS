import { Request, Response } from "express";
import { db } from "../config/db";
import { capitalize } from "../utils/strings";

export async function getAllUsers(req: Request, res: Response) {
  const { rows } = await db.query(`SELECT name, phone, signup_date FROM users;`);

  return res.json(rows);
}

export async function getLastUsers(req: Request, res: Response) {
  const { rows } = await db.query(`SELECT name, phone, signup_date FROM users ORDER BY id DESC LIMIT 10;`);

  return res.status(200).json(rows);
}

export async function getUsersCount(req: Request, res: Response) {
  const { rows } = await db.query(`SELECT COUNT(*) AS total FROM users;`);

  const count = Number(rows[0].total);

  return res.status(200).json({
    message: `Atualmente temos ${count} usuários cadastrados!`,
    count
  });
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const query = "SELECT name, phone, signup_date FROM users WHERE id = $1;"
    const result = await db.query(query, [id])

    if (result.rows.length <= 0) {
      return res.status(404).json({ message: "Usuario não encontrado, por favor forneça um ID válido"})
    } else {
      return res.status(200).json(result.rows);
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro interno inesperado.", error });
  }
}

export async function searchUsersByFilters(req: Request, res: Response) {
  const { name } = req.query

  let filteredName = String(name)
  filteredName = capitalize(filteredName)

  const query = "SELECT name, phone, signup_date FROM users WHERE name = $1;"
  const result = await db.query(query, [filteredName])

  return res.status(200).json(result.rows)
}