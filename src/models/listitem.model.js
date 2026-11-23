import mongoose from "mongoose";

const listitemSchema= new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    serie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Serie',
        required:true
    },

    listStatus:{
        type:String,
        enum:['pending','watching','watched'],
        default:'pending'
    },

    addedAt:{
        type:Data,
        default:Date.now
    }

});

listitemSchema.index({user:1, serie:1},{unique:true}); //crea un indice con los usuarios y las series y limita que no se repitan series en un mismo usuario


const Listitem=mongoose.model('Listitem',listitemSchema);

export default Listitem;