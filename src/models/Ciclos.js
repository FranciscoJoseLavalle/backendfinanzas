export default class Ciclos {
    static get model() {
        return 'Ciclos';
    }
    static get schema() {
        return {
            Ciclos: {
                // type: mongoose.SchemaType.ObjectId, // Me tiraba error
                type: Array,
                ref: 'Ciclo'
            }
        }
    }
}