import { Router } from 'express';
import cicloController from '../controllers/ciclo.controller.js';
import movimientosController from '../controllers/movimientos.controller.js';

const router = Router();

const authMiddleware = movimientosController.authMiddleware;

router.get('/:cid', (req, res) => {
    res.send({ message: "Sending ciclo" })
});
router.post('/:cid', authMiddleware, cicloController.saveCiclo);

export default router;