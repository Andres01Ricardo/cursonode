const { response } = require("express");
const { Categoria } = require('../models');

// obtenerCategorias - pagina - total - populate
const obtenerCategorias = async(req, res = response) =>{
    const { limite = 5 , desde = 0 } = req.query;
    const query = {estado : true};


    const [total , categorias] = await Promise.all([
      
      Categoria.countDocuments(query),
      Categoria.find(query)
      .populate('usuario')
      .skip(Number(desde))
      .limit(Number(limite))
    ]);

    res.json({
      total,
      categorias
    });
}

//obtener categoria - populate {}
const obtenerCategoriaID = async(req, res = response) =>{
    const { id } = req.params;
    console.log(req.params);
    const categoria = await Categoria.findById(id)
    .populate('usuario');

    res.json({
        msg:'ok',
        categoria
        //id
    })
}

const crearCategoria = async(req,res=response) =>{


    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if (categoriaDB) {
        return res.status(400).json({
            msg:`La categoría ${categoriaDB.nombre} ya existe`
        });
    }

    //generar la data a guardar


    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    const categoria = new Categoria (data);

    //console.log(data);

    //guardar DB
    await categoria.save();

    res.status(201).json(categoria);


}


//actualizar categoria
const actualizaCategoria = async(req,res = response)=>{
    const {id} = req.params;
    const {_id,usuario,estado,...resto}= req.body;
    resto.nombre = resto.nombre.toUpperCase();
    const categoria = await Categoria.findByIdAndUpdate(id,resto,{new :true});

    res.status(200).json({
        msg:'actualizado correctamente',
        categoria
    })
}


const borrarCategoria = async(req,res =response)=>{
    const {id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});

    res.status(200).json({
        msg:'eliminado correctamente',
        categoriaBorrada
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaID,
    actualizaCategoria,
    borrarCategoria
}