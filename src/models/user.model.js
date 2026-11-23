import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    
userName:{
    type:String,
    required:true,
    trim:true,
    minlength:3,
    maxlength:30
},
userEmail: {
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
},
userPassword:{
    type:String,
    required:true,
    select:false //para que el campo no se devuelva nunca
},
userRole: {
    type: String,
    enum: ['user','admin'],
    default: 'user'
}

},{ timestamps: true }
);



const User = mongoose.model('User', userSchema);

export default User;