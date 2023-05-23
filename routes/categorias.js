const  { Router } = require('express');
const { body,validationResult, check } = require('express-validator');

const { validarJWT,validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoriaID, actualizaCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

//  {{url}}/api/categorias
// obtener todas las categorias - publico
router.get('/',obtenerCategorias )


// obtener categoria por id - publico
router.get('/:id',[
    check('id','no es un id de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
    
], obtenerCategoriaID
    
);


// crear categoria - privado - cualquier rol
router.post('/', [
    validarJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],crearCategoria);


// actualizar cateogria por id - privado - cualquier rol
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','no es un id de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,  
],
 actualizaCategoria
);


// borrar categoria por id - privado - ADMIN_ROLE
router.delete('/:id',[
        validarJWT,
        esAdminRole,
        check('id','No es un id valido').isMongoId(),
        check('id').custom(existeCategoria),
        validarCampos
    ],
    borrarCategoria
);

module.exports = router;