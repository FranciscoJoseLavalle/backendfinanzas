import GenericRepository from "./GenericRepository.js";
import Ciclo from "../models/Ciclo.js";
import { cicloService, ciclosService } from "./services.js";

export default class CicloRepository extends GenericRepository {
    constructor(dao) {
        super(dao, Ciclo.model);
    }

    saveCiclo = async (params, document) => {
        let ciclo = await this.save(document, this.model);
        return { ciclo }
        // let ciclos = await ciclosService.getBy(params)
        // console.log(document);
        // console.log(ciclo);
        // console.log(ciclos, params);
        // ciclos.ciclos.push(ciclo._id)
        // let finishedCiclos = await ciclosService.editOne(params, ciclos);
        // return finishedCiclos;
    }
}