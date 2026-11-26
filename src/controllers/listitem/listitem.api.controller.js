import ListitemRepository from "../../repositories/listitem.repositoy.js";

// _________________ CREATE

const create = async (req,res)=>{
    const listitem = await ListitemRepository.create(req.body);
    res.json({data:listitem});
};


// _________________ READ

//-- lista de datos

const getAll = async (req,res)=>{
    const listitems=await ListitemRepository.getAll();
    res.json({data:listitems});
};

//-- dato individual

const getById= async(re,res)=>{
    const listitemId=parseInt(req.params.id);
    const listitem= await ListitemRepository.getById(listitemId);
    res.json({data:listitem});
};


// _________________ UPDATE

//-- dato completo

const update = async (req,res)=>{
    const listitemId= parseInt(req.params.id);
    const listitem= await ListitemRepository.update(listitemId,req.body);
    res.json({data:listitem});
};

//-- dato individual

const modify = async (req,res)=>{
    const listitemId = parseInt(req.params.id);
    const listitem= await ListitemRepository.modify(listitemId,req.body);
    res.json({data:listitem});
};



// _________________ DELETE

const remove = async (req, res) =>{
    const listitemId= parseInt(req.params.id);
    await ListitemRepository.remove(listitemId);
    res.json({message: "Lista eliminada"});
};


export default{
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}

