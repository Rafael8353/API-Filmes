import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { createUserSchema, updateUserSchema } from '../schemas/userSchema';
import { registerUser, listarUsuariosService, atualizarUsuarioService, excluirUsuarioService } from '../services/userService';

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await registerUser(data);
    res.status(201).json({ id: user.id, nome: user.nome, email: user.email });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function listarUsuarios(req: Request, res: Response): Promise<void> {
  const usuarios = await listarUsuariosService();
  res.json(usuarios);
}

export async function atualizarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    const data = updateUserSchema.parse(req.body);
    const usuarioAtualizado = await atualizarUsuarioService(id, data);
    res.json(usuarioAtualizado);
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function excluirUsuario(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    await excluirUsuarioService(id);
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
}
