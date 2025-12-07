import { Request, Response } from "express";
import { db } from "../config/db";
import { capitalize } from "../utils/strings";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { secretKey } from "../config/env";

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
  const { email, password } = req.body

  try {
    const query = "SELECT id, name, email, password_hash FROM users where email = $1"
    const user = await db.query(query, [email])

    if (user.rows.length === 0) {
      return res.json({ error: "Usuário não encontrado, por favor insira um usuário válido!" })
    }

    const passwordHashed = user.rows[0].password_hash
    const match = await bcrypt.compare(password, passwordHashed)

    if (!match) {
      return res.json({ error: "Senha incorreta, por favor verifique novamente." })
    }

    if(!secretKey) {
      return res.json({ error: "Erro interno, por favor entre em contato com o SUPORTE"})
    }

    const { id: userId, name: userName, email: userEmail, phone: userPhone } = user.rows[0];

    const payload = { userId }

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
    return res.json({ 
      token, 
      user: {
        id: userId,
        name: userName,
        email: userEmail,
        phone: userPhone
       }
    })

  } catch (error) {
    return res.json({ error })
  }
}