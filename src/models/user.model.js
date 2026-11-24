import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    
userName:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    minlength:3,
    maxlength:20
},
userEmail: {
    type:String,
    required:[true, "El email es obligatorio"],
    unique:true,
    lowercase:true,
    trim:true,
    match: [/^\S+@\S+\.\S+$/, "El email no es válido"]
},
userPassword:{
    type:String,
    required:[true, "La contraseña es obligatoria"],
    select:false //para que el campo no se devuelva nunca
},
userRole: {
    type: String,
    enum: ['user','admin'],
    default: 'user'
}

},{ timestamps: true,

    toJSON: {
      // Al convertir a JSON (res.json) quitamos la contraseña y __v
      transform: (_doc, ret) => {
        const { password, __v, ...user } = ret;
        return user;
      },
    },
 }
);


const User = mongoose.model('User', userSchema);

export default User;