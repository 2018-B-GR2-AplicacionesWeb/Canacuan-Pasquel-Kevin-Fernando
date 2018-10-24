//FOREACH:
//forEach, itera sobre el arreglo

const arreglo = ['A', 'b', 'C'];
/* const respuestaforEach = arreglo.forEach(
    (valorActual, indiceActual, arreglo) => {
        console.log('valor: ', valorActual);
        console.log('indice: ',indiceActual);
        console.log('arreglo: ', arreglo);
    }
); */
const respuestaforEach  = arreglo.forEach((v) => console.log(v));
console.log(respuestaforEach);      //forEach, devuelve un valor undefined

//MAP
//muta un arreglo, cambia los valores del arreglo

const respuestaMap = arreglo
    .map((v) => v.toUpperCase())
    .forEach((v) => console.log(v));        //paradigma de la programacion funcional

console.log(arreglo);
console.log(respuestaMap);      //retorna un nuevo arreglo

//-----------------------------------------------------------

const arregloNumero = [7,3,9,1,8,2,4,6,5,10];

//filter
//Recibe una expresion
if(1 === '1') {
    console.log('Si');
} else {
    console.log('No');
}
const respuestaFilter = arregloNumero.filter(
    (v) => v % 2 === 0);
            //return false; devuelve un arreglo vacio
console.log(respuestaFilter);
// el triple igual compara los tipos ademas de los valores
// el == solo compara valores


//FIND INDEX
//Devuelve el indice
respuestaFindIndex = arregloNumero.findIndex(
    (valorActual) => {
        return valorActual === 7
    }
);
console.log(respuestaFindIndex);
//findiex, indexof, el objeto completo vs la parte completa del objeto


//FIND
//devuelve todos los datos del objeto

respuestaFind = arregloNumero.find(
    (valorActual) => {
        return valorActual === 5;
    }
);
console.log("FIND" + respuestaFind);

//--------------------------------------------------------------------

//SOME
//retorna un valor booleano
const respuestaSome = arregloNumero
    .some(
        (valorActual) => {
            return valorActual > 10;    //Expreison
        }
    );
console.log(respuestaSome);

//EVERY
//retonna un valor booleano, es el contrario de some
const respuestaEvery = arregloNumero
    .every(
        (valorActual) => {
            return valorActual > 4;     //Expresion
        }
    );
console.log(respuestaEvery);

//---------------------------------------------------------------

//REDUCE
//Ayuda hacer operaiones con numeros
//No recibe un parametro, recibe dos parametros:
    //funcion, valor(donde empieza la operacion)

console.log(arregloNumero);
const respuestaReduce = arregloNumero
    .reduce(
        (valorAcumulado, valorActual) => {
            //return valorActual + valorAcumulado;      //la operacion que se desea reaizar
            return valorAcumulado - valorActual;
        },
        100 //0       //valor donde inicia el valor
    );
console.log(respuestaReduce);

//REDUCE RIGHT
const respuestaReduceRight = arregloNumero
    .reduceRight(
        (valorAcumulado, valorActual) => {
            return valorActual + valorAcumulado;      //la operacion que se desea reaizar
            //return valorAcumulado - valorActual;
        },
        0   //100       //valor donde inicia el valor
    );
console.log(respuestaReduceRight);

//--------------------------------------------------------------

//SORT
//muta el arreglo,
//se recomienda clonar el arrreglo
const arregloNumerosClonado = JSON.parse(JSON.stringify(arregloNumero));

const respuestarSort = arregloNumerosClonado
    .sort(
        (a, b) => a - b
    );
console.log(respuestarSort);
console.log(arregloNumero);
