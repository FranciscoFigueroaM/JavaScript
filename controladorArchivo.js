const fs = require('fs');
const consultas = require('axios');

// Number
// Este convertira a numero siempre y cuadno sea un numeral, entonces '5' = 5 usandolo por lo cual al usarlo para validar resultados concretos de nuestra funcion nos beneficia gratamente ya que no limite el uso y alcance de este para ser implementado
const datosPaises = () => {
    return new Promise((resolve, reject) => {
        consultas.default.get('https://restcountries.eu/rest/v2/all')
            .then(respuesta => {

                let data = 'const paises = '

                console.log("Se pidieron los datos");
                const datos = respuesta.data;

                // const getKeys = function(obj){
                //     var keys = [];
                //     for(let key in obj){
                //        keys.push(key);
                //        console.log(key);
                //     }
                //     return keys;
                //  }

                // let array = [];
                // array.push(respuesta)

                datos.forEach(element => {
                    if (element.translations.es) {
                        const pais = element.translations.es;
                        data += `
                        {
                            label:"${pais}",
                            value:"${pais}"
                        },`;
                    } else {
                        const paisSinNombre = element.name;
                        data += `
                        {
                            label:"${paisSinNombre}",
                            value:"${paisSinNombre}"
                        },`;
                    }
                });
                resolve(data);
            });
    })
}

let crearArchivo = () => {

    return new Promise((resolve, reject) => {

        let data = ``;

        datosPaises()
            .then(respuesta => {
                data = respuesta;

                // 1- Nombre del archivo y extencion a crear, 2- el contenido que tendra 3- callback
                // en el nombre del archivo nosotros podemos indicar una carpeta carpeta/nombre.extencion
                fs.writeFile(`paises.js`, data, (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve(`paises.js`)
                });
            })
    });
}
// Exportar funcionalidades
module.exports = {
    crearArchivo,
}