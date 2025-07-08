import { z } from 'zod';

export const createUserSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  senha: z.string().min(6),
  perfil: z.enum(['COMUM', 'ADMIN']).optional(),
});

export const updateUserSchema = createUserSchema.partial(); // para atualizar campos opcionais
