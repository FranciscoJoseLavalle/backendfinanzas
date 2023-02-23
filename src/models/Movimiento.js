export default class Movimiento {
    static get model() {
        return 'Movimiento';
    }
    static get schema() {
        return {
            type: String,
            detail: String,
            date: String,
            amount: Number,
            cathegory: String,
        }
    }
}