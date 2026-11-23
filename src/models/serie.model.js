import mongoose from "mongoose";


const seasonSchema=new mongoose.Schema({
    seasonTitle:{
        type:String,
        trim:true //eliminar espacion antes y despues
    },
    seasonNumEpisodes:{
        type:Number,
        required:true,
        min:1
    }

});




const serieSchema= new mongoose.Schema({

    serieTitle:{
        type:String,
        trim:true,
        required:true
    },
    serieGenre:{
        type:String,
        enum:['accion', 'aventura', 'romance', 'drama', 'comedia', 'terror'],
        default:[]
    },
    serieSinopsis:{
        type:String,
        trim:true
    },
    serieYear:{
        type:Number,
        min:1900,
        max:2100
    },
    seasons:[seasonSchema] // para relacion 1-n [], si fuera 1-1 estaria sin []

},{ timestamps: true } //createdAt y updatedAt automaticos
);


const Serie= mongoose.model('Serie',serieSchema);

export default Serie;