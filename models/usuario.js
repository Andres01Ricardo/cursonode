

const { Schema,model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        requied:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        requied:[true,'La contraseña es obligatoria']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        requied:true,
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
});

UsuarioSchema.methods.toJSON = function(){
    const { __v,password,_id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model( 'Usuario', UsuarioSchema );