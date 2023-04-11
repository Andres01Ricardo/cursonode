

const  { Router } = require('express');
const { body,validationResult, check } = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');


const { usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch 
} = require('../controllers/usuarios');
const { esRoleValido, emailExiste,existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();




router.get('/',  usuariosGet);

router.put('/:id',[
    check('id','No es un ID válido').isMongoId().bail().custom(existeUsuarioPorId),
    // check('id').custom(existeUsuarioPorId),
    body('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut );

router.post('/', [
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('password','El password es obligatorio').not().isEmpty(),
    body('password','El password debe tener más de 6 caracteres').isLength({min:6}),
    body('correo','El correo no es valido').isEmail(),
    //body('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    body('correo').custom( emailExiste ),
    body('rol').custom( esRoleValido ),
    validarCampos
] ,usuariosPost );

router.delete('/:id',[
    check('id','No es un ID válido').isMongoId().bail().custom(existeUsuarioPorId),
    validarCampos
]
, usuariosDelete );

router.patch('/',  usuariosPatch);


module.exports = router;