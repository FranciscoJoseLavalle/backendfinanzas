export default class Ciclo {
    static get model() {
        return 'Ciclo';
    }
    static get schema() {
        return {
            name: String,
            date: String,
            movimientos: Array
        }
    }
}