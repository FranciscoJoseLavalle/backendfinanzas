import Dao from '../models/Dao.js';
import MovimientoRepository from './MovimientoRepository.js';
import MovimientosRepository from './MovimientosRepository.js';
import UserRepository from './UserRepository.js';

const dao = new Dao();

export const userService = new UserRepository(dao);
export const movimientosService = new MovimientosRepository(dao);
export const movimientoService = new MovimientoRepository(dao);