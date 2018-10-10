var nombreVariable = 'valorVariable';

//Tipos de Datos
var edad = 1;                       //number
var edad2 = 1.1;                    //number
var edad3 = '1';                    //string
var casado = false;                 //boolean
var amigable = null;                //object
var existeONo;                      //undefined (tipo de dato o dato)

//Tipos de Clases
var fechaNacimiento = new Date('1994-12-29');       //object


//JSON

//Javascript
//var kevin = {} --> Objeto
var kevin = {
    //key: value,
    "nombre": 'Kevin',
    edad: 23,
    hijos: undefined,
    llave: "valor",
};
console.log(kevin.nombre);      //'Kevin'
console.log(kevin.edad);        //23

//Objeto JSON
var kevinJSON = {
    //"key":"value"
};


//console --> imprime valores en consola
//typeof_ --> nos dice el tipo de datos
console.log('edad', typeof edad);
console.log('edad2', typeof edad2);
console.log('casado', typeof casado);
console.log('amigable', typeof amigable);
console.log('existeONo', typeof existeONo, existeONo);

console.log('fechaNacimiento', typeof fechaNacimiento);

console.log(10 + 10);
if (true) {
    //SI
}
else {
    //NO
}

//El valor 0, null, undefined --> hace que se imprima el NO, los demás tipos van por el SI
if (0) {
    //SI
}
else {
    //NO
}

var i,sum=0;
for (i = 0; i < 5; i++) {
    sum += sum + i;
}
console.log(sum);

//NO TIPADO --> no posee tipos de datos
//var edad = 10;

//TIPADO
//Int edad = 10;
