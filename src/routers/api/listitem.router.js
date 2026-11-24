import {Router} from "express";
import Listitem from "../../models/listitem.model.js";

const router = Router();

router.post("/",async(data)=>{
    const listitem=await Listitem.create(data);
});

router.get("/", async()=>{
    const listitems=await Listitem.find();
    return listitems;
});

router.get("/:id",async(id)=>{
    const listitem=await Listitem.findById(id);
    return listitem;
});

router.put("/:id",async(id,data)=>{
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
});

router.patch("/:id", async(id,data)=>{
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
});

router.delete("/:id", async(id)=>{
    const listitem = await Listitem.findByIdAndDelete(id);
});


export default router;
