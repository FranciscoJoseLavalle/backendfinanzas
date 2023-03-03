import GenericRepository from "./GenericRepository.js";
import Ciclos from "../models/Ciclos.js";
import { movimientosService } from "./services.js";

export default class CiclosRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Ciclos.model);
    }

    saveCiclo = async (params, document, filter) => {
        let ciclos = await this.getBy(params)
        ciclos.ciclos.push(document)
        console.log(ciclos);
        console.log(params);
        console.log(document);
        let finishedCiclos = await this.editOne(params, ciclos);
        await movimientosService.deleteAllMovements(filter)
        return finishedCiclos;
    }
}