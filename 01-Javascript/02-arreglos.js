var arreglo = [
    1,
    2.2,
    "Hola",
    true,
    false,
    {},             //objetos
    undefined,      //undefined
    null,           //nulos
    []              //arreglos
];

var arregloNumeros = [1, 2, 3];

//Acceso al arreglo
arregloNumeros[0];  //1
arregloNumeros[2];  //3
console.log(arregloNumeros[4])  //undefined

arregloNumeros.push(4);         //.push --> agrega elementos al final del arreglo
console.log(arregloNumeros);

arregloNumeros.pop();           //.pop --> elimina el ultimo elemento del arreglo
console.log(arregloNumeros);

arregloNumeros.splice(0, 0, 0);           //.splice --> remueve elementos del arreglo, puede insertar nuevos elementos
// ; devuelve los elementos eliminados --> sintaxis (posicion, #elementos, insertar_valores)
console.log(arregloNumeros);

arregloNumeros.splice(2, 0, 1.5);
console.log(arregloNumeros);

var usuario = 1.5;
var indiceUsuario = arregloNumeros.indexOf(usuario);   //.indexOf --> retorna el indice del valor buscado
arregloNumeros.splice(indiceUsuario, 1, 1.5);
console.log(arregloNumeros);

console.log(arregloNumeros.slice(2, 5));        //.slice --> devuelve la seccion de un arreglo

//Destructuracion de Arreglos
var arregloNotasPrimerBimestre = [8.5, 9, 4];
var arregloNotasSegundoBimestre = [8.5, 9, 4];

var arregloNotas2018B = [...arregloNotasPrimerBimestre,
    ...arregloNotasSegundoBimestre];        // ... --> Destructuracion de arreglos.
console.log(arregloNotas2018B);

//Destructuracion de Objetos
var kevin2018A = {
    sexualidad: 0,
    web: 7
};
var kevin2018B = {
    musica: 7,
    moviles: 8
};

var kevin = {
    ...kevin2018A,
    ...kevin2018B
};
console.log('kevin: ', kevin);