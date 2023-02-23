import { movimientosService, userService } from "../services/services.js";
import { createHash, isValidPassword } from "../utils.js";
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

const register = async (req, res) => {
    let { first_name, last_name, password, email } = req.body;
    try {
        let user = await userService.getUserByEmail(email);
        if (user) return res.status(400).send({ status: 'error', error: "El usuario ya existe" });
        let movimientos = await movimientosService.save({ movimiento: [] })
        const hashedPassword = await createHash(password);
        const newUser = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            movimientos: movimientos._id
        }
        let result = await userService.save(newUser);
        const token = jwt.sign(result, config.app.TOKEN, { expiresIn: "30m" })
        res.send({ status: "success", message: "User registered", payload: token });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const login = async (req, res) => {
    let { password, email } = req.body;
    try {
        if (!email || !password) return res.status(400).send({ status: 'error', error: "Incomplete values" });

        let user = await userService.getUserByEmail(email);
        if (!user) return res.status(400).send({ status: "error", error: "Incorrect credentials" })

        if (!isValidPassword(user, password)) return res.status(400).send({ status: "error", error: "Incorrect password" })
        let userResult = {
            email,
            name: user.first_name,
            fullName: `${user.first_name} ${user.last_name}`,
            role: user.role,
            id: user._id,
            movimientos: user.movimientos
        }
        const token = jwt.sign(userResult, config.app.TOKEN, { expiresIn: "30m" })
        res.send({ status: "success", message: "Logged in succesfully", payload: token });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

const logout = async (req, res) => {
    try {
        req.session.user = null
        res.send({ status: "success", message: "Logout succesfull" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Internal error", trace: error })
    }
}

export default {
    register,
    login,
    logout
}