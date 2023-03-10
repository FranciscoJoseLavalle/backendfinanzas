import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

router.post('/register', sessionsController.register)
router.post('/login', sessionsController.login)
router.post('/logout', sessionsController.logout)

export default router;