import prisma from '../prismaClient';
import bcrypt from 'bcryptjs';

interface RegisterUserInput {
  nome: string;
  email: string;
  senha: string;
}

interface UpdateUserInput {
  nome?: string;
  email?: string;
  senha?: string;
  perfil?: string;
}

export async function registerUser(data: RegisterUserInput) {
  const existingUser = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error('Email já cadastrado');
  }

  const hashedPassword = await bcrypt.hash(data.senha, 10);

  const user = await prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: hashedPassword,
      perfil: 'COMUM',
    },
  });

  return user;
}

export async function listarUsuariosService() {
  return prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      perfil: true,
    },
  });
}

export async function atualizarUsuarioService(id: number, data: UpdateUserInput) {
  // Se senha foi enviada para atualização, faça o hash antes
  if (data.senha) {
    data.senha = await bcrypt.hash(data.senha, 10);
  }

  return prisma.usuario.update({
    where: { id },
    data,
  });
}

export async function excluirUsuarioService(id: number) {
  await prisma.usuario.delete({
    where: { id },
  });
}
