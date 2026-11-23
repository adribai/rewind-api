import {Router} from "express";
import User from "../../models/user.model.js";


const router = Router();


router.post("/", async(data)=>{

    const user = await User.create(data);

});


router.get("/",async()=>{
    const users=await User.find();
    return users;
});


router.get("/:id", async(id)=>{
    const user=await User.findById(id)
    return user;
});


router.put("/:id", async(id,data)=>{
    const {userName, userEmail, userPassword, userRole}=data;
    const user=await User.findById(id);


    if(user){
        user.userName=userName;
        user.userEmail=userEmail;
        user.userPassword=userPassword;
        user.userRole=userRole;
        await user.save();
        return user;
    }else{
        return null;
    }
});



router.patch("/id",async(id,data)=>{

    const{userName,userEmail,userPassword,userRole}=data;
    const user= await User.findById(id);

    if(!user){
        return null
    }
    user.userName= userName || user.userName;
    user.userEmail= userEmail || user.userEmail;
    user.userPassword= userPassword || user.userPassword;
    user.userRole= userRole ?? user.userRole;
    await user.save();
    return user;

});


router.delete("/:id", async(id)=>{
    const user= await User.findByIdAndDelete(id);
});

export default router;