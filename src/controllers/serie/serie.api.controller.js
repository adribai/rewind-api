import serieRepository from "../../repositories/serie.repository.js";

// _________________ CREATE

const create = async (req,res)=>{
    const serie = await serieRepository.create(req.body);
    res.json({data:serie});
};


// _________________ READ

//-- lista de datos

const getAll = async (req,res)=>{
    const series=await serieRepository.getAll();
    res.json({data:series});
};

//-- dato individual

const getById= async(re,res)=>{
    const serieId=parseInt(req.params.id);
    const serie= await serieRepository.getById(serieId);
    res.json({data:serie});
};


// _________________ UPDATE

//-- dato completo

const update = async (req,res)=>{
    const serieId= parseInt(req.params.id);
    const serie= await serieRepository.update(serieId,req.body);
    res.json({data:serie});
};

//-- dato individual

const modify = async (req,res)=>{
    const serieId = parseInt(req.params.id);
    const serie= await serieRepository.modify(serieId,req.body);
    res.json({data:serie});
};



// _________________ DELETE

const remove = async (req, res) =>{
    const serieId= parseInt(req.params.id);
    await serieRepository.remove(serieId);
    res.json({message: "Serie eliminada"});
};


export default{
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}



