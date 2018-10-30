//Modulo file system, fs
const fs = require('fs');

console.log('Inicio');
fs.readFile(
    '06-texto.txt',      //nombre del archivo
    'utf-8',
    (error, textoLeidoDelArchivo) => {
        if(error) {
            //Hacer caer el programa
            try {
                throw new Error(error);
            } catch (e) {
                console.log(e);
            }
        } else {

            //CALLBACK HELL !!!
            
            console.log('Inicio 2');
            fs.writeFile(
                '06-texto.txt',
                textoLeidoDelArchivo + 'Mundo',
                (err) => {
                    if(err) console.log('ERROR');
                    console.log('Archivo Actualizado');
                }
            );
            console.log('Fin 2');
        }
    }
);


console.log('Fin');