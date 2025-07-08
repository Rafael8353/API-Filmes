import { z } from 'zod';

export const createFilmeSchema = z.object({
  titulo: z.string().min(1, 'Título obrigatório'),
  genero: z.string().min(1, 'Gênero obrigatório'),
  ano: z.number().int().gte(1900).lte(2100),
});
