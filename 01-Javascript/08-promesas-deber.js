const fs = require('fs');

const ejercicioForEach = (arreglo) =>{
    const arregloRespuestas = [];
    return new Promise ((resolve, reject )=>{
        arreglo.forEach(
            (string, indice)=>{
                const nombreArchivo = `${indice} - ${string}.txt`;
                const contenidoArchivo = string;
                fs.writeFile(nombreArchivo, contenidoArchivo, (err) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        const respuesta = {
                            nombreArchivo:nombreArchivo,
                            contenidoArchivo:contenidoArchivo,
                            error:err
                        };
                        arregloRespuestas.push(respuesta);
                        resolve(arregloRespuestas)
                    }
                })
            });
    })
};


ejercicioForEach( ['A','B','C','D'])
    .then(
        () => {
            return ejercicioForEach(['A','B','C','D']);
        }
    )
    .catch(
        (error) => {
            console.log(error);
        }
    );