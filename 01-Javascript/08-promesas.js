
//Promesa, instancia de la clase Promise

const fs = require('fs');

const promesa = (nombreArchivo) => {
    return new Promise(
        (resolve, reject)  => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(contenidoLeido);
                    }
                }
            );
        }
    );
};


const promesaEscritura = (
    nombreArchivo,
    contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                nombreArchivo,
                contenidoArchivo,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoArchivo);
                    }
                }
            );
        }
    );
};

//Las promesas tienen dos metodos para ejecutar
// .then y .catch
// Los callback no son necesario recibir como parametros en las promesas

console.log(promesa);
promesa('02 - C.txt')
    .then(
        (contenido) => {
            console.log('OK', contenido);
            return promesaEscritura(
                '2 - C.txt',
                contenido + '\nNuevo contenido');
            //Promesa
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log(contenidoCompleto);
        }
    )
    .catch(
        (error) => {
            console.log('MAL', error);
        }
    );

//Convertir appendFile a promesa
//DEBER: transformar el ejercicio del for each a promesa


const promesaAppendFile = (nombreArchivo, contenidoNuevo) => {
    return new Promise(
        (resolve, reject)  => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if(error) {
                        reject(contenidoNuevo);
                    } else {
                        resolve(contenidoLeido, contenidoNuevo);
                    }
                }
            );
        }
    );

};

const promesaAppendFileNuevo = (nombreArchivo,
                           contenidoNuevo) => {
    return new Promise(
        (resolve, reject)  => {
            fs.writeFile (
                nombreArchivo,
                contenidoNuevo,
            );
        }
    );
};

const promesaAppendFileAct = (nombreArchivo,
                                contenidoLeido,
                                contenidoNuevo) => {
    return new Promise(
        (resolve, reject)  => {
            fs.writeFile (
                nombreArchivo,
                contenidoLeido + contenidoNuevo,
            );
        }
    );
};


promesaAppendFile('2 - C.txt','HOLAAAA')
    .then(
        (aux) => {
            return promesaAppendFileAct('2 - C.txt','HOLAAAA', 'asdasdsadsa');
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log('ARCHIVO ACTUALIZADO');
        }
    )
    .catch(
        (aux) => {
            return promesaAppendFileNuevo('2 - C.txt','HOLAAAA');
        }
    );
