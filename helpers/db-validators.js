const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido =  async(rol = '') => {
    const existeRol = await Role.findOne({ rol });

    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste =  async(correo = '' )=>{
    const existeEmail = await Usuario.findOne({correo});
    if( existeEmail ){
        throw new Error(`El correo ${correo} ya existe`);
    }
}

const existeUsuarioPorId =  async(id )=>{
    const existeUsuario = await Usuario.findOne({_id:id});
    if( !existeUsuario ){
        throw new Error(`El id: ${id} no existe`);
    }
}


const existeCategoria =  async(id )=>{
    const existeCategoria = await Categoria.findOne({_id:id});
    if( !existeCategoria ){
        throw new Error(`El id: ${id} no existe`);
    }
}


const existeProducto =  async(id )=>{
    console.log('ingreso aca');
    const existeProducto = await Producto.findOne({_id:id});
    if( !existeProducto ){
        throw new Error(`El id: ${id} no existe`);
    }
}

const coleccionesPermitidas = (coleccion = '' , colecciones = [])=>{
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`la coleccion ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;

}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}