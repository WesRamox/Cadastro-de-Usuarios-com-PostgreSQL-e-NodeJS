import { Request, Response } from "express";
import { db } from "../db";
import { capitalize } from "../utils/strings";
import bcrypt from "bcrypt";

export async function signUpAuth(req: Request, res: Response) {
  const { name, phone, email, password } = req.body

  let filteredName = String(name)
  filteredName = capitalize(name)

  if (!name || !phone || !email || !password) {
    return res.status(422).json({ message: "Atenção, é necessario preencher os campos para continuar" })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const query = `INSERT INTO users (name, phone, email, password_hash) values ($1, $2, $3, $4);`;
    await db.query(query, [name, phone, email, passwordHash]);

    return res.status(201).json({ message: `Cadastro de ${name} foi realizado com sucesso` });
  } catch (error) {
    return res.status(400).json({ message: "Erro ao cadastrar.", error })
  }
}

export async function signInAuth(req: Request, res: Response) {
  return res.json({ message: "Ok sign in " })
}