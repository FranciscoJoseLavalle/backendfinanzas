import { Router } from 'express';
import ciclosController from '../controllers/ciclos.controller.js';
import movimientosController from '../controllers/movimientos.controller.js';

const router = Router();

const authMiddleware = movimientosController.authMiddleware;

router.get('/:cid', ciclosController.getCiclos);
router.post('/:cid/:mid', authMiddleware, ciclosController.saveCiclo);
router.delete('/:cid', authMiddleware, ciclosController.deleteCiclo);

export default router;