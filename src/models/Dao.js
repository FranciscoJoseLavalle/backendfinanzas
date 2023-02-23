import mongoose from 'mongoose';
import config from "../config/config.js";

import User from './User.js';
import Movimientos from './Movimientos.js';
import Movimiento from './Movimiento.js';

export default class Dao {
    constructor() {
        mongoose.set("strictQuery", false);
        this.connection = mongoose.connect(config.mongo.URL)

        const userSchema = mongoose.Schema(User.schema)
        const movimientosSchema = mongoose.Schema(Movimientos.schema)
        const movimientoSchema = mongoose.Schema(Movimiento.schema)

        this.models = {
            [User.model]: mongoose.model(User.model, userSchema),
            [Movimientos.model]: mongoose.model(Movimientos.model, movimientosSchema),
            [Movimiento.model]: mongoose.model(Movimiento.model, movimientoSchema),
        }
    }

    getAll = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].find(params).lean();
    }

    findOne = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe')
        return this.models[entity].findOne(params).lean();
    }

    save = (document, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].create(document);
    }

    editOne = (params, entity, document) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].findOneAndUpdate(params, document, {
            new: true
        });
    }

    deleteOne = (params, entity) => {
        if (!this.models[entity]) throw new Error('La entidad no existe');
        return this.models[entity].deleteOne(params);
    }
}