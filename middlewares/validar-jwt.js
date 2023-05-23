const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT=async (req,res=response,next)=>{    
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg:'no se recibio token en la peticion'
        })
    }

    try {

        
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        // leer el usuario
        const usuarioAutenticado = await Usuario.findById(uid);

        if (!usuarioAutenticado) {
            return res.status(401).json({
                msj: 'El usuario no existe'
            })
        }


        // verificar si esta activo
        if (!usuarioAutenticado.estado) {
            return res.status(401).json({
                msj: 'El usuario no esta activo'
            })
        }

        req.usuarioAutenticado = usuarioAutenticado;
        
        
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }


    
   

}



module.exports = {
    validarJWT
}