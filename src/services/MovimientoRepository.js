import GenericRepository from "./GenericRepository.js";
import Movimiento from "../models/Movimiento.js";

export default class MovimientoRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Movimiento.model);
    }

    // getUserByEmail = (email) => {
    //     return this.getBy({ email })
    // }
}