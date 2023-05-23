const { Router, response } = require("express");
const { crearProducto, obtenerProductos, obtenerProductoID, actualizaProducto, borrarProducto } = require("../controllers/productos");
const { validarJWT,validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { check } = require("express-validator");

const router = Router();

//crear un producto
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','La categoria es obligatorio').not().isEmpty(),
    check('categoria','no es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],
 crearProducto
);


//obtener la lista de todos los productos
router.get('/',obtenerProductos);


//obtener producto por id
router.get('/:id',[
    check('id','no es un id de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],
obtenerProductoID);



// actualizar cateogria por id - privado - cualquier rol
router.put('/:id', [
    validarJWT,
    check('id','no es un id de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos,  
],
 actualizaProducto
);


// borrar categoria por id - privado - ADMIN_ROLE
router.delete('/:id',[
        validarJWT,
        esAdminRole,
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeProducto),
        validarCampos
    ],
    borrarProducto
);

module.exports = router;