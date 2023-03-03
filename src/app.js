import express from 'express';
import sessionsRouter from './routes/sessions.router.js'
import movimientosRouter from './routes/movimientos.router.js'
import cicloRouter from './routes/ciclo.router.js'
import ciclosRouter from './routes/ciclos.router.js'
import __dirname from './utils.js'
import MongoStore from "connect-mongo";
import session from "express-session";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import config from './config/config.js';

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
const app = express();
const PORT = process.env.PORT || 8080;

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

app.post('/pruebaDatos', authMiddleware, (req, res) => {
    res.send({ status: "success", payload: req.session.user });
})
app.use('/api/sessions', sessionsRouter);
app.use('/movements', movimientosRouter)
app.use('/ciclo', cicloRouter)
app.use('/ciclos', ciclosRouter)



app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});