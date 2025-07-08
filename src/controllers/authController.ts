import { Request, Response } from 'express';
import { loginUser } from '../services/authService';

export async function login(req: Request, res: Response) {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
