import * as mongoose from 'mongoose';

export const TransacaoSchema = new mongoose.Schema({

    quantidade:{ 
        type: Number
     },
    tipo: {
        type: String,
        enum:['debito','credito'], 
    }
})