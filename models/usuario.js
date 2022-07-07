const {Schema,model}= require('mongoose');

const UsuarioSchema= Schema({
    name:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'La contraseña es obligatorio']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required:true,
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type: Boolean,
        default:true
    },    
    google:{
        type: Boolean,
        default:false
    }    
});

//Quitar el password de la responsive 
UsuarioSchema.methods.toJSON= function(){

    /* instancia con los valores (objecto literal) se saca __v y password, los demas datos se guardan en usuario   */
    const {__v, password,_id, ...usuario}=this.toObject(); 
    usuario.uid=_id;
    return usuario;
}


module.exports=model('Usuario',UsuarioSchema);