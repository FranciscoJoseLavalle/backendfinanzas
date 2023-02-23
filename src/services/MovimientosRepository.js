import GenericRepository from "./GenericRepository.js";
import Movimientos from "../models/Movimientos.js";

export default class MovimientosRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Movimientos.model);
    }

    addMovement = async (params, data) => {
        try {
            let movement = await this.getBy(params, this.model)
            console.log(movement);
            console.log(data);
            movement.movimiento.push(data);
            console.log(movement);
            let movementUpdated = await this.editOne(params, { movimiento: movement.movimiento })
            return movementUpdated;
        } catch (error) {
            return { status: "error", error: "Internal error", trace: error }
        }
    }

    editMovement = async (params, data) => {
        try {
            let movement = await this.getBy(params, this.model)
            let newMovements = [];
            movement.movimiento.forEach(element => {
                if (element.date == data.date) {
                    element = data;
                }
                newMovements.push(element);
            })
            let movementUpdated = await this.editOne(params, { movimiento: newMovements })
            return movementUpdated;
        } catch (error) {
            return { status: "error", error: "Internal error", trace: error }
        }
    }

    filterMovement = async (params, data) => {
        try {
            console.log(params);
            let movement = await this.getBy(params, this.model)
            let movementFiltered = [];
            movement.movimiento.forEach(element => {
                console.log('hola3');
                if (element.type === data) {
                    movementFiltered.push(element);
                }
            })
            return movementFiltered;
        } catch (error) {
            return { status: "error", error: "Internal error", trace: error }
        }
    }

    deleteMovement = async (params, data) => {
        try {
            let movement = await this.getBy(params, this.model)
            console.log(data);
            let newMovement = movement.movimiento.filter(movimiento => movimiento.date != data)
            let movementUpdated = await this.editOne(params, { movimiento: newMovement })
            return movementUpdated;
        } catch (error) {
            return { status: "error", error: "Internal error", trace: error }
        }
    }
}