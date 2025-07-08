import { Router } from 'express';
import { register, listarUsuarios, atualizarUsuario, excluirUsuario } from '../controllers/userController';
import { validate } from '../middlewares/validate';
import { createUserSchema } from '../schemas/userSchema';
import { authenticateToken } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const router = Router();

// Rota pública para registro
router.post('/register', validate(createUserSchema), register);

// Middleware que exige autenticação e perfil ADMIN para as rotas abaixo
router.use(authenticateToken);
router.use(roleMiddleware(['ADMIN']));

// Listar todos usuários (admin)
router.get('/', listarUsuarios);

// Atualizar usuário pelo id (admin)
router.put('/:id', validate(createUserSchema), atualizarUsuario);

// Excluir usuário pelo id (admin)
router.delete('/:id', excluirUsuario);

export default router;
