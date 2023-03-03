import { cicloService, ciclosService } from '../services/services.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.body;
        jwt.verify(token, config.app.TOKEN, (err, user) => {
            if (err) {
                res.send({ status: "error", message: "Necesitas estar logueado" })
            } else {
                req.session.user = user;
                next()
            }
        })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const getCiclo = async (req, res) => {
    try {
        console.log("Llegué");
        const mid = req.params.mid;
        console.log(req.session);
        console.log(mid);
        let ciclo = await ciclosService.getAll({ _id: mid })
        res.send({ status: "success", message: "All ciclos", payload: ciclo, session: req.session.user })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const saveCiclo = async (req, res) => {
    try {
        const cid = req.params.cid;
        const { ciclo } = req.body;
        let ciclos = await cicloService.saveCiclo({ _id: cid }, ciclo)
        console.log("Llegupe");
        res.send({ status: "success", message: "Ciclo saved successfully", payload: ciclos, session: req.session.user })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    authMiddleware,
    getCiclo,
    saveCiclo
}