

const dbValidators = require('./db-validators');
const generarJWT = require('./generarjwt');
const googeVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');



module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googeVerify,
    ...subirArchivo,
}