import { Router } from 'express';
import movimientosController from '../controllers/movimientos.controller.js';

const router = Router();

const authMiddleware = movimientosController.authMiddleware;


router.get('/:mid', movimientosController.getMovements);
router.get('/:mid/:type', movimientosController.getMovementsFiltered);
router.post('/:mid', authMiddleware, movimientosController.addMovement);
router.put('/:mid', authMiddleware, movimientosController.editMovement);
router.delete('/:mid', authMiddleware, movimientosController.deleteMovement);

export default router;