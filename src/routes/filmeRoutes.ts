import { Router } from 'express';
import { criar, listar, atualizar, excluir } from '../controllers/filmeController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validate';
import { createFilmeSchema } from '../schemas/filmeSchema';

const router = Router();

router.post('/', authenticateToken, validate(createFilmeSchema), criar);
router.get('/', authenticateToken, listar);
router.put('/:id', authenticateToken, validate(createFilmeSchema), atualizar);
router.delete('/:id', authenticateToken, excluir);

export default router;
