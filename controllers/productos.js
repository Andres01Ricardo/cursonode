const { response } = require("express");

const {Producto} = require('../models');



const crearProducto = async(req,res=response)=>{
    const nombre = req.body.nombre.toUpperCase();
    const {estado,usuario, ...body} = req.body;
    const productoDB = await Producto.findOne({nombre});

    if (productoDB) {
        return res.json({
            msg:'El producto ya existe'
        });
    }
    const data = {
        nombre,
        usuario:req.usuarioAutenticado._id,
        ...body
    }

    const producto = new Producto(data);

    //console.log(data);

    //guardar DB
    await producto.save();

    res.status(201).json(producto);
}


const obtenerProductos = async(req,res=response)=>{

    const {limite=5, desde=0} = req.query;
    const query = {estado:true};

    const [total,productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .limit(limite)
        .skip(desde)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
    ])

    res.json({
        msg:'ok',
        total,
        productos
    })

}


//obtener producto - populate {}
const obtenerProductoID = async(req, res = response) =>{
    const { id } = req.params;
    console.log(req.params);
    const producto = await Producto.findById(id)
    .populate('usuario','nombre')
    .populate('categoria','nombre');

    res.json({
        msg:'ok',
        producto
        //id
    })
}


//actualizar categoria
const actualizaProducto = async(req,res = response)=>{
    const {id} = req.params;
    const {_id,usuario,estado,...resto}= req.body;
    resto.nombre = resto.nombre.toUpperCase();
    const producto = await Producto.findByIdAndUpdate(id,resto,{new :true});

    res.status(200).json({
        msg:'actualizado correctamente',
        producto
    })
}


const borrarProducto = async(req,res =response)=>{
    const {id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id,{estado:false,disponible:false},{new:true});

    res.status(200).json({
        msg:'eliminado correctamente',
        productoBorrado
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoID,
    actualizaProducto,
    borrarProducto
}