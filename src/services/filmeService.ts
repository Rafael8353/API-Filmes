import prisma from '../prismaClient';

interface FilmeInput {
  titulo: string;
  genero: string;
  ano: number;
}

export async function criarFilme(data: FilmeInput, userId: number) {
  return prisma.filme.create({
    data: {
      ...data,
      usuarioId: userId,
    },
  });
}

export async function listarFilmes(userId: number, isAdmin: boolean) {
  if (isAdmin) {
    return prisma.filme.findMany();
  }
  return prisma.filme.findMany({
    where: { usuarioId: userId },
  });
}

export async function atualizarFilme(id: number, data: FilmeInput, userId: number, isAdmin: boolean) {
  const filme = await prisma.filme.findUnique({ where: { id } });

  if (!filme || (!isAdmin && filme.usuarioId !== userId)) {
    throw new Error('Filme não encontrado ou sem permissão');
  }

  return prisma.filme.update({
    where: { id },
    data,
  });
}

export async function excluirFilme(id: number, userId: number, isAdmin: boolean) {
  const filme = await prisma.filme.findUnique({ where: { id } });

  if (!filme || (!isAdmin && filme.usuarioId !== userId)) {
    throw new Error('Filme não encontrado ou sem permissão');
  }

  return prisma.filme.delete({
    where: { id },
  });
}
