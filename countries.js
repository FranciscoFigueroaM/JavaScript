const { crearArchivo } = require("./controladorArchivo");

crearArchivo()
    .then(respuesta => {
        console.log("terminado");
    })
    .catch(error => {
        console.log("error");
    })