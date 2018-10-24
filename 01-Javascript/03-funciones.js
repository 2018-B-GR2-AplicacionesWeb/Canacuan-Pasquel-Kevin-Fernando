//var

var variable = 'valor';     //NUNCA MAS -- scops de las funciones y demas

//Dos diferentes forrmas de declaracion de variables

let edad = 29;      //Mutar el objeto... cambiar el objeto a algo.
edad = 30;

const casado = false;       //Var inmutable.. no se asignar valores
// No se puede hacer: casado = true;

const edadV2 = 30;
edadV2 = 31;



const mascotas = {};
//mascotas = 1;
mascotas.cachetes = 'Cachetes';
mascotas.numero = 1;
delete mascotas.numero;

const carros = [];
//carros = [];
carros[0] = 1;
carros.push('FINAL');
carros.pop();

//Los metodos de los objetos pueden ssr utilizados, aunque la reasignacion
//de los valores del objeto no se puede hacer

//Siempre hay q utilizar variables "const", xq la inmutabilidad de codigo
//Si de verdad no se puede utilizar const, se puede utilizar "let"
//"var" jamas se debe usar

//Anonymous Functions
//Son funciones sin nombre que se pueden en 3 casos:

const saludar = function () {
  //implementacion
};      //las variables puedes ser asginadas con funciones anonimas
saludar();


const usuario = {
    nombre:'Kevin',
    saludarV2:function () {
        return this.nombre    //this --. acceder a los metodos y funciones del objeto
        //se pueden usar en metodos de los objetos
    }
};

usuario.saludarV2();

//enviar como parametros
saludar("Kevin", function(texto){
    console.log(texto);
});


//NUNCA MAS USAR FUNCIONES ANONIMAS

//Funciones de flechas gorda => (fat arrow functions)

const saludarV3 = () => {
    //implementacion
};
saludarV3();

const usuarioV2 = {
  nombre: 'Kevin',
  saludar: () => {
  }
};

saludar("Kevin", (texto) => {
    console.log(texto);
});

const sumarDosNumerosV2 = function (numeroUno, numeroDos) {
    return numeroUno + numeroDos;
};

const sumarDosNumerosV2 = (n1, n2) => n1 + n2;
//cuando se retorna un parametro, se puede obvear el return

const saludarV5 = saludo => console.log(saludo);
//cuando se usa un parametro, se puede omitir los parentesis


