import Serie from "../models/serie.model.js";

// _________________ CREATE

const create= async(data)=>{
    const serie= await Serie.create(data);
    return serie;
};



// _________________ READ

//-- lista de datos

const getAll = async()=>{
    const series=await Serie.find();
    return series;
};

//-- dato individual

const getById = async(id)=>{
    const serie=await Serie.findById(id);
    return serie;
};



// _________________ UPDATE

//-- dato completo

const update = async(id,data)=>{
    const {serieTitle, serieGenre, serieSinopsis, serieYear, seasons}=data;
    const serie=await Serie.findById(id);
    if(serie){
        serie.serieTitle=serieTitle;
        serie.serieGenre=serieGenre;
        serie.serieSinopsis=serieSinopsis;
        serie.serieYear=serieYear;
        serie.seasons=seasons;
        await serie.save();
        return serie;
    }else{
        return null;
    }
};

//-- dato individual

const modify= async(id,data)=>{
    const {serieTitle,serieGenre, serieSinopsis,serieYear,seasons}=data;
    const serie=await Serie.findById(id);

    if(!serie){
        return null;
    }
    serie.serieTitle=serieTitle || serie.serieTitle;
    serie.serieGenre=serieGenre || serie.serieGenre;
    serie.serieSinopsis=serieSinopsis || serie.serieSinopsis;
    serie.serieYear=serieYear || serie.serieYear;
    serie.seasons=seasons || serie.seasons;
    await serie.save();
    return serie;
};


// _________________ DELETE


const remove = async(id)=>{
    const serie=await Serie.findByIdAndDelete(id);
};

export default {
    create,
    getAll,
    getById,
    getById,
    update,
    modify,
    remove
};