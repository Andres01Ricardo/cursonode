const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const {q,nombre,apikey} = req.query;
    res.json({
        ok:true,
        msg:'probando get controlador',
        q,
        nombre,
        apikey
    });
  }

  const usuariosPost =(req, res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        ok:true,
        msg:'probando post controlador',
        nombre,
        edad
    })
  }
  const usuariosPut =(req, res = response) => {

    const id = req.params.id;
    res.json({
        ok:true,
        msg:'probando put controlador',
        id
    })
  }
  const usuariosPatch =(req, res = response) => {
    res.json({
        ok:true,
        msg:'probando patch controlador',
        datos:{
            nombre:'pepito',
            numero:'12345465'
        }
    })
  }
  const usuariosDelete =(req, res = response) => {
    res.json({
        ok:true,
        msg:'probando delete controlador',
        datos:{
            nombre:'pepito',
            numero:'12345465'
        }
    })
  }


  module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
  }