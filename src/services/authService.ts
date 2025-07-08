import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface LoginInput {
  email: string;
  senha: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'segredo_supersecreto'; // ideal usar variável ambiente

export async function loginUser(data: LoginInput) {
  const user = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const senhaValida = await bcrypt.compare(data.senha, user.senha);
  if (!senhaValida) {
    throw new Error('Senha incorreta');
  }

  const token = jwt.sign(
    { userId: user.id, perfil: user.perfil },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, user: { id: user.id, nome: user.nome, email: user.email, perfil: user.perfil } };
}
