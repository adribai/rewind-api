import Listitem from "../models/listitem.model.js";

// _________________ CREATE

const create= async(data)=>{
    const listitem= await Listitem.create(data);
    return listitem;
};



// _________________ READ

//-- lista de datos

const getAll = async()=>{
    const listitem=await Listitem.find();
    return listitem;
};


//-- dato individual

const getById = async(id)=>{
    const listitem=await Listitem.findById(id);
    return listitem;
};



// _________________ UPDATE

//-- dato completo

const update = async(id,data)=>{
    const {user,serie,listStatus,addedAt}=data;
    const listitem=await Listitem.findById(id);
    if(listitem){
        listitem.user=user;
        listitem.serie=serie;
        listitem.listStatus=listStatus;
        listitem.addedAt=addedAt;
        await listitem.save();
        return listitem;
    }else{
        return null;
    }
};

//-- dato individual

const modify=  async(id,data)=>{
    const {user,serie,listStatus,addedAt}=data;
    const listitem=await Listitem.findById(id);

    if(!listitem){
        return null;
    }
    listitem.user=user || listitem.user;
    listitem.serie=serie || listitem.serie;
    listitem.listStatus=listStatus || listitem.listStatus;
    listitem.addedAt=addedAt || listitem.addedAt;
    await listitem.save();
    return listitem;
};


// _________________ DELETE


const remove = async(id)=>{
    const listitem = await Listitem.findByIdAndDelete(id);
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