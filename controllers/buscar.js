const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const {Usuario, Categoria, Producto} = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuario = async(termino = '', res = response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        res.json({
            results:(usuario) ? [usuario] : []
        });
    }


    const regexp = new RegExp( termino, 'i' );
    const usuarios = await Usuario.find({
        $or:[{ nombre:regexp },{ correo:regexp }],
        $and:[{estado:true}]
    });
    res.json({
        results:usuarios
    });

}
const buscarCategoria = async(termino = '', res = response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        res.json({
            results:(categoria) ? [categoria] : []
        });
    }


    const regexp = new RegExp( termino, 'i' );
    const cateogrias = await Categoria.find({nombre:regexp, estado:true  });
    res.json({
        results:cateogrias
    });

}
const buscarProducto = async(termino = '', res = response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        res.json({
            results:(producto) ? [producto] : []
        });
    }


    const regexp = new RegExp( termino, 'i' );
    const productos = await Producto.find({
        $or:[{nombre:regexp},{descripcion:regexp}],
        $and:[{estado:true}]
     }).populate('categoria','nombre');
    res.json({
        results:productos
    });

}

const buscar = (req,res=response)=>{

    const {coleccion,termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino,res);
            break;
        case 'categorias':
            buscarCategoria(termino,res);
            break;
        case 'productos':
            buscarProducto(termino,res);
            break;
    
        default:
            res.status(500).json({
                msg:'Problemas con esta busqueda'
            })
            break;
    }


}



module.exports={
    buscar
}