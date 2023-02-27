import { movimientosService } from '../services/services.js';
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

const getMovements = async (req, res) => {
    try {
        const mid = req.params.mid;
        let movement = await movimientosService.getBy({ _id: mid })
        res.send({ status: "success", message: "All movements", payload: movement.movimiento, session: req.session.user })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const getMovementsFiltered = async (req, res) => {
    try {
        const mid = req.params.mid;
        const type = req.params.type;
        let movement = await movimientosService.filterMovement({ _id: mid }, type)
        res.send({ status: "success", message: "Movements filtered", payload: movement, session: req.session.user })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const addMovement = async (req, res) => {
    try {
        const mid = req.params.mid;
        const { movement } = req.body;
        let movementAdded = await movimientosService.addMovement({ _id: mid }, movement)
        res.send({ status: "success", message: "New movement added", payload: movementAdded, session: req.session.user })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const editMovement = async (req, res) => {
    try {
        const mid = req.params.mid;
        const { movement } = req.body;
        let movementAdded = await movimientosService.editMovement({ _id: mid }, movement)
        res.send({ status: "success", message: "Movement edited", payload: movementAdded, session: req.session.user })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const deleteMovement = async (req, res) => {
    try {
        const mid = req.params.mid;
        const { id } = req.body;
        let movementAdded = await movimientosService.deleteMovement({ _id: mid }, id)
        res.send({ status: "success", message: "Movement deleted", payload: movementAdded, session: req.session.user })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    authMiddleware,
    getMovements,
    getMovementsFiltered,
    addMovement,
    editMovement,
    deleteMovement,
}