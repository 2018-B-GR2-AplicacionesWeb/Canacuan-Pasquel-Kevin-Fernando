
//Lee un archivo, y si existe texto. Añade al final
//un nuevo texto.

const fs = require('fs');

//Tampoco se puede usar una variable global, ni return
//let contenidoFinal = 'Inicial';

function appendFile(nombreArchivo,
                    contenidoArchivo,
                    callback) {
    // 1 -> leer archivo
    // 2.1 -> concatenar contenido
    // 2.2 -> Crear el archivo

    fs.readFile(
        nombreArchivo,
        'utf-8',
        (error, contenidoLeido) => {
            if(error) {
                const contenido = contenidoArchivo;
                fs.writeFile (
                    nombreArchivo,
                    contenido,
                    (err) => {
                        if(err) {
                            //console.log('Error', err);
                            callback(err);
                        } else {
                            //En callback no se puede usar el return
                            //return contenido;
                            //contenidoFinal = contenido;
                            callback(undefined, contenido);
                        }
                    }
                );
            } else {
                //concatenar archivo
                const contenido = contenidoLeido + contenidoArchivo;
                fs.writeFile (
                    nombreArchivo,
                    contenido,
                    (err) => {
                        if(err) {
                            //console.log('Error', err);
                            callback(err);
                        } else {
                            //return contenido;
                            //contenidoFinal = contenido;
                            callback(undefined, contenido);
                        }
                    }
                );
            }
        }
    );
}

appendFile('07-texto.txt', '\nAdios',
    (error, contenidoTexto) => {
        if(error) {
            console.log(error);
        } else {
            console.log(contenidoTexto);
        }
    }
    );

//Los callbacks sirven para devolver la respuesta de una funcion
//dentro de la programacion asincrona


//EJERCICIO:
//Aceptar un arreglo  de Strings ['A', 'B', 'C']
//Por cada elemento, se debe guardar en un archivo:
//  indice - textoIndice.txt
//  0 - A.txt   'A'
//  1 - B.txt   'B'
//  2 - C.txt   'C'

// Y en la respuesta guardar:
    //nombre archivo
    //contenido archivo
    //error, si existe

const respuesta = {
    nombreArchivo: '0-A.txt',
    contenidoArchivo: 'A',
    error: undefined
};

function ejercicio(arregloStrings,
                   callback) {
    const arregloRespuestas = [];
    arregloStrings.forEach(
        (string, indice) => {
            const nombreArchivo = `${indice} - ${string}.txt`;
            const contenidoArchivo = string;

            fs.writeFile(
                nombreArchivo,
                contenidoArchivo,
                (err) => {
                    const respuesta = {
                        nombreArchivo: nombreArchivo,
                        contenidoArchivo: contenidoArchivo,
                        error: err
                    };
                    arregloRespuestas.push(respuesta);
                    const terminoElArreglo = arregloStrings.length === arregloRespuestas.length;
                    if(terminoElArreglo) {
                        callback(arregloRespuestas);
                    }
                }
            )
        }
    )
}

ejercicio(['A', 'B', 'C'],
    (arregloRespuestas) => {
        console.log(arregloRespuestas);
    }
    );

//LET, CONST, FAT-ARROW-FUNCTION --> siempre se deben usar