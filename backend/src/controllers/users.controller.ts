import { Request, Response } from "express";
import { db } from "../db";

export async function getAllUsers(req: Request, res: Response) {
  const { rows } = await db.query(`SELECT * FROM users;`);
  return res.json(rows);
}

export async function createNewUser(req: Request, res: Response) {
  const { name, phone } = req.body

  if (!name || !phone) {
    return res.status(422).json({ message: "Atenção, é necessario preencher os campos para continuar" })
  }

  try {
    const query = `INSERT INTO users (name, phone) VALUES ($1, $2)`;
    await db.query(query, [name, phone]);

    return res.status(201).json({ message: `Cadastro de ${name} foi realizado com sucesso` });
  }
  catch (error: any) {
    if (error.code === "23505") {
      return res.status(400).json({
        message: "Erro ao cadastrar: este número já está cadastrado."
      });
    }

    return res.status(500).json({ message: "Erro interno inesperado." });
  }
}