import { Request, Response } from 'express';
import { criarFilme, listarFilmes, atualizarFilme, excluirFilme } from '../services/filmeService';
import { createFilmeSchema } from '../schemas/filmeSchema';
import { ZodError } from 'zod';

export async function criar(req: Request, res: Response): Promise<void> {
  try {
    const data = createFilmeSchema.parse(req.body);
    const filme = await criarFilme(data, req.user!.userId);
    res.status(201).json(filme);
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(400).json({ error: error.message });
  }
}

export async function listar(req: Request, res: Response): Promise<void> {
  const filmes = await listarFilmes(req.user!.userId, req.user!.perfil === 'ADMIN');
  res.json(filmes);
}

export async function atualizar(req: Request, res: Response): Promise<void> {
  try {
    const filme = await atualizarFilme(
      parseInt(req.params.id),
      req.body,
      req.user!.userId,
      req.user!.perfil === 'ADMIN'
    );
    res.json(filme);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function excluir(req: Request, res: Response): Promise<void> {
  try {
    await excluirFilme(parseInt(req.params.id), req.user!.userId, req.user!.perfil === 'ADMIN');
    res.json({ message: 'Filme excluído com sucesso' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
