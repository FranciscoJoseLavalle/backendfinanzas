export default class Movimientos {
    static get model() {
        return 'Movimientos';
    }
    static get schema() {
        return {
            movimiento: {
                // type: mongoose.SchemaType.ObjectId, // Me tiraba error
                type: Array,
                ref: 'Movimiento'
            }
        }
    }
}