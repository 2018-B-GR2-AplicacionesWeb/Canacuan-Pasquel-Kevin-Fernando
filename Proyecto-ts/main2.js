// @ts-ignore
const rxjs = require('rxjs');
// @ts-ignore
const fs = require('fs');
// @ts-ignore
const mergeMap = require('rxjs/operators').mergeMap;
// @ts-ignore
const map = require('rxjs/operators').map;
// @ts-ignore
const inquirer = require('inquirer');
// @ts-ignore
const componente_computador = require('./productos');
//const cliente = require('./Entidades/EntCliente');
//const clienteFunciones = require('./Lógica/NegCliente');
const preguntasIngresoComponente = [
    {
        type: 'input',
        name: 'idComponente',
        message: "Cuál es el id del nuevo componente",
    },
    {
        type: 'input',
        name: 'stock',
        message: "Ingrese el stock",
    },
    {
        type: 'input',
        name: 'descripcion',
        message: "Ingrese una descripcion",
    },
    {
        type: 'input',
        name: 'precio',
        message: "Cuál es el precio ?",
    },
];
const opcionesComponenteCRUD = [
    {
        type: 'list',
        name: 'opcionesComponente',
        message: ' Escoja una opción...',
        choices: ['Ingresar Nuevo Componente', 'Buscar Componente', 'Borrar Componente', 'Actualizar Componente', 'Salir']
    }
];
const preguntaClienteBusquedaPorId = [
    {
        type: 'input',
        name: 'idCliente',
        message: 'Escribe el id del cliente'
    }
];
function inicializarBase() {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        fs.readFile('bdd.json', 'utf-8', (err, contenido) => {
            if (err) {
                fs.writeFile('bdd.json', '{"componentes_computador":[]}', (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error',
                            error: 500
                        });
                    }
                    resolve({
                        mensaje: 'ok',
                        bdd: JSON.parse('{"componentes_computador":[]}')
                    });
                });
            }
            else {
                resolve({
                    mensaje: 'BDD Leida',
                    bdd: JSON.parse(contenido)
                });
            }
        });
    });
}
function main() {
    const respuestaBDD$ = rxjs.from(inicializarBase());
    respuestaBDD$
        .pipe(preguntarOpcionesCRUD(), pedirDatosComponente(), ejecutarAccion(), guardarBaseDeDatos())
        .subscribe((data) => {
        console.log(data);
    }, (error) => {
        console.log(error);
    }, () => {
        main();
        console.log('Complete');
    });
}
function preguntarOpcionesCRUD() {
    return mergeMap((respuestaBDD) => {
        return rxjs
            .from(inquirer.prompt(opcionesComponenteCRUD))
            .pipe(map((respuesta) => {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
        }));
    });
}
function pedirDatosComponente() {
    return mergeMap((respuestaBDD) => {
        const opcionComponente = respuestaBDD.opcionMenu.opcionesProducto;
        switch (opcionComponente) {
            case 'Ingresar Nuevo Componente':
                return rxjs
                    .from(inquirer.prompt(preguntasIngresoComponente))
                    .pipe(map((componente) => {
                    respuestaBDD.componente = componente;
                    return respuestaBDD;
                }));
            case 'Actualizar Componente':
            //return preguntarIdComponente(respuestaBDD);
            case "Buscar Componente":
            //return preguntarIdClienteBuscado(respuestaBDD);
            case "Borrar Componente":
            //return preguntarIdClienteBuscado(respuestaBDD);
        }
    });
}
function ejecutarAccion() {
    return map((respuestaBDD) => {
        const opcion = respuestaBDD.opcionMenu.opcionesProducto;
        switch (opcion) {
            case "Ingresar Nuevo Componente":
                const componente = respuestaBDD.componente;
                console.log(componente);
                respuestaBDD.bdd.componente.push(componente);
                return respuestaBDD;
            case "Actualizar Componente":
                const indice = respuestaBDD.indiceComponente;
                respuestaBDD.bdd.componente[indice].descripcion = respuestaBDD.componente.descripcion;
                return respuestaBDD;
            case "Buscar Componente":
                const indiceBuscado = respuestaBDD.indiceComponente;
                if (indiceBuscado === -1) {
                    console.log('No se encontró al componente deseado');
                }
                else {
                    console.log('Componente encontrado: ', respuestaBDD.bdd.componente[indiceBuscado]);
                }
                return respuestaBDD;
            case "Borrar Componente":
                const indiceComponenteABorrar = respuestaBDD.indiceComponente;
                if (indiceComponenteABorrar === -1) {
                    console.log('No se encontró al componente deseado');
                }
                else {
                    respuestaBDD.bdd.componente.splice(indiceComponenteABorrar, 1);
                }
                return respuestaBDD;
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap((respuestaBDD) => {
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function guardarBDD(bdd) {
    // @ts-ignore
    return new Promise((resolve, reject) => {
        fs.writeFile('bdd.json', JSON.stringify(bdd), (error) => {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
main();
