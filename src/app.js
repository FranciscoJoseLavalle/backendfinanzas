import express from 'express';
import sessionsRouter from './routes/sessions.router.js'
import __dirname from './utils.js'
import MongoStore from "connect-mongo";
import session from "express-session";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { movimientosService } from './services/services.js';
import config from './config/config.js';

const app = express();
const PORT = process.env.PORT || 8080;

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

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: config.app.SECRET,
    store: MongoStore.create({
        mongoUrl: config.mongo.URL,
        ttl: 3600
    }),
    resave: false,
    saveUninitialized: false
}))

app.use('/api/sessions', sessionsRouter);
app.post('/pruebaDatos', authMiddleware, (req, res) => {
    res.send({ status: "success", payload: req.session.user });
})

app.get('/movements/:mid', async (req, res) => {
    const mid = req.params.mid;
    let movement = await movimientosService.getBy({ _id: mid })
    res.send({ status: "success", message: "All movements", payload: movement.movimiento, session: req.session.user })
});
app.get('/movements/:mid/:type', async (req, res) => {
    const mid = req.params.mid;
    const type = req.params.type;
    let movement = await movimientosService.filterMovement({ _id: mid }, type)
    console.log(movement);
    res.send({ status: "success", message: "Movements filtered", payload: movement, session: req.session.user })
});
app.post('/movements/:mid', authMiddleware, async (req, res) => {
    const mid = req.params.mid;
    const { movement } = req.body;
    console.log(movement);
    let movementAdded = await movimientosService.addMovement({ _id: mid }, movement)
    res.send({ status: "success", message: "New movement added", payload: movementAdded, session: req.session.user })
});
app.put('/movements/:mid', authMiddleware, async (req, res) => {
    const mid = req.params.mid;
    const { movement } = req.body;
    // console.log(movement);
    let movementAdded = await movimientosService.editMovement({ _id: mid }, movement)
    res.send({ status: "success", message: "Movement edited", payload: movementAdded, session: req.session.user })
});
app.delete('/movements/:mid', authMiddleware, async (req, res) => {
    const mid = req.params.mid;
    const { id } = req.body;
    console.log(req.body);
    console.log(id);
    let movementAdded = await movimientosService.deleteMovement({ _id: mid }, id)
    res.send({ status: "success", message: "Movement deleted", payload: movementAdded, session: req.session.user })
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});