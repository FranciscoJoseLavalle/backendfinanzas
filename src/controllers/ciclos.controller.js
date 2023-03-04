import { ciclosService } from '../services/services.js';
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

const getCiclos = async (req, res) => {
    try {
        const cid = req.params.cid;
        let ciclos = await ciclosService.getBy({ _id: cid })
        res.send({ status: "success", message: "All ciclos", payload: ciclos, session: req.session.user })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const saveCiclo = async (req, res) => {
    try {
        const { cid, mid } = req.params;
        const { ciclo } = req.body;
        let ciclos = await ciclosService.saveCiclo({ _id: cid }, ciclo, {_id: mid})
        res.send({ status: "success", message: "Ciclo saved successfully", payload: ciclos, session: req.session.user })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const deleteCiclo = async (req, res) => {
    try {
        const { cid } = req.params;
        const { date } = req.body;
        let ciclos = await ciclosService.deleteCiclo({ _id: cid }, date)
        res.send({ status: "success", message: "Ciclo deleted successfully", payload: ciclos, session: req.session.user })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    authMiddleware,
    getCiclos,
    saveCiclo,
    deleteCiclo
}