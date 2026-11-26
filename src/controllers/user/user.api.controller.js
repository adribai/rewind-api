import userRepository from "../../repositories/user.repository.js";


// _________________ CREATE

const create = async (req,res)=>{
    const user = await userRepository.create(req.body);
    res.json({data:user});
};


// _________________ READ

//-- lista de datos

const getAll = async (req,res)=>{
    const users= await userRepository.getAll();
    res.json({data:users});
};

//-- dato individual

const getById = async (req,res)=>{
    const userId = parseInt(req.params.id);
    const user = await userRepository.getById(userId);
    res.json({data:user});
};


// _________________ UPDATE

//-- dato completo

const update = async (req,res)=>{
    const userId= parseInt(req.params.id);
    const user= await userRepository.update(userId,req.body);
    res.json({data:user});
};

//-- dato individual

const modify = async (req,res)=>{
    const userId= parseInt(req.params.id);
    const user= await userRepository.modify(userId,req.body);
    res.json({data:user});
};


// _________________ DELETE

const remove = async (req, res) =>{
    const userId= parseInt(req.params.id);
    await userRepository.remove(userId);
    res.json({message: "Usuario eliminado"});
};


export default{
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}