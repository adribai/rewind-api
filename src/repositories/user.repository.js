import User from "../models/user.model.js";


// _________________ CREATE

const create = async(data)=>{

    const user = await User.create(data);
    return user;

};


// _________________ READ

//-- lista de datos

const getAll= async()=>{
    const users=await User.find();
    return users;
};

//-- dato individual

const getById= async(id)=>{
    const user=await User.findById(id)
    return user;
};

const getByEmail = async (email) => {
  return User.findOne({ userEmail: email.toLowerCase() }).select("+userPassword");
};


// _________________ UPDATE

//-- dato completo

const update= async(id,data)=>{
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
};

//-- dato individual

const modify= async(id,data)=>{

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

};


// _________________ DELETE

const remove= async(id)=>{
    const user= await User.findByIdAndDelete(id);
};



export default {
    create,
    getAll,
    getById,
    getById,
    getByEmail,
    update,
    modify,
    remove
};