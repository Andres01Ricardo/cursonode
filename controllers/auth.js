const { response, json } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generarjwt');
const { googleVerify } = require("../helpers/google-verify");

const login = async(req,res = response) =>{

    const { correo,password} = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }
        // si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado false'
            })
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password'
            })
        }
        //generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            msg:'login ok',
            token: token,
            usuario:usuario
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Ocurrio un error'
        })
    }
}


const googleSignIn = async(req,res= response)=>{
    const {id_token} = req.body;

    try {
        const {nombre,img,correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            // crear el usuario por autenticacion con google
            const data = {
                nombre,
                correo,
                password:'sinPass',
                img,
                google:true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        // si el usuario en DB

        if (!usuario.estado){
            return res.status(401).json({
                msg:'Contacte con el administrador del sistema, usuario bloqueado'
            });
        }
        

        //generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            msg:'ok',
            id_token,
            usuario
        })
    } catch (error) {
        json.status(400).json({
            ok:false,
            msg: 'El token no se pudo verificar'
        })
    }

    
}

module.exports = {
    login,
    googleSignIn
}