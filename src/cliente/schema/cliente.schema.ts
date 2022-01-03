import * as mongoose from 'mongoose';

export const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    saldo:{
        type: Number,
    },
    transacao: [
        {
            quantidade:{
                type: Number,
            },
            tipo: {
                type: String,
                enum:['debito','credito'],
            }
        }
    ],
})