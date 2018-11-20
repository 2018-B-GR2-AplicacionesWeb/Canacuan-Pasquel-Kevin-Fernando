declare var require:any;

var inquirer = require('inquirer');
const rxjs = require('rxjs');
const fs = require('fs');
const fs2 = require('fs');

//DATOS INICIALES

// CARGAR DATOS
const llenarBDD  = (nombreArchivo)=>{
    // @ts-ignore
    return new Promise(
        (resolve,reject)=>{
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error,contenidoArchivo) => {
                    if (error){
                        reject(error);
                    }else {
                        resolve(contenidoArchivo)
                    }
                }
            );
        }
    )
};

let productos=[];
llenarBDD('bdd')
    .then(
        (contenido)=>{
            String(contenido).split(",").forEach(
                (value)=>{
                    productos.push(value);
                }
            )

        }
    );

//  --- MENU ----

// MENU PRINCIPAL
function menuInicial() {
    inquirer
        .prompt(login)
        .then(
            (respuestas) => {
                if (respuestas.sesion == 'admin') {
                    
                    // MENU ADMINISTRADOR
                    inquirer
                        .prompt(login_administrador)
                        .then((respuestas) => {
                                if (respuestas.clave) {
                                    operacionesCrud();
                                }else {
                                    console.log(respuestas.clave);
                                    menuInicial();
                                }
                            }
                        );
                } else {
                    inquirer
                        .prompt(menuComprador)
                        .then((respuestas) => {
                                if (respuestas.opciones != 'Salir') {
                                    console.log('Eliga un componente:')
                                    let pedido = new Pedido();
                                    //elegirComponente(pedido);
                                }
                            }
                        );
                }

            }
        );

}

//PREGUNTAS MENUS
let login = [
    {
        type: "list",
        name: "sesion",
        message: "Entrar como:",
        choices: ['Admin', 'Cliente'],
        filter:( val )=>{ return val.toLowerCase(); }
    },

];

let login_administrador = [
    {
        type: 'input',
        name: 'nickname',
        message: "nickname",
    },
    {
        type: 'password',
        message: 'User Password:',
        name: 'clave',
        validate: function (answer) {
            if (answer!=='admin') {
                return 'User Password required!';
            }
            return true;
        }
    },
];


let seleccionarOperacionCrud = [
    {
        type:"list",
        name:"crud_op",
        message:"Que operacion desea realizar ? ",
        choices: ['Ingresar Productos','Consultar Productos','Modificar Nombre Producto','Eliminar Productos','salir'],
        validate:(respuesta)=>{
            if(respuesta.crud_op=='salir'){
                return false;
            }else{
                return respuesta
            }
        }
    }
];

let actualizar = [
    {
        type:'input',
        name:"old",
        message:"Ingrese que tipo de componente desea actualizar ?"
    },
    {
        type:'input',
        name:"nuevo",
        message:"Ingrese el nuevo valor: "
    }
];

let eliminar = [
    {
        type:"input",
        name:'borrar',
        message:"Ingrese que tipo de componente desea eliminar?",

    }
];

let insertar = [
    {
        type:"input",
        name:'insert',
        message:"Ingrese el nuevo componente: ",

    }
];


//MENU COMPRADOR
let menuComprador = [

    {
        type: "list",
        name: "opciones",
        message: "Que desea hacer?",
        choices: [
            "Realizar Compra",
            "Salir",

        ],
    },

];

let menuComprador2 = [

    {
        type: "list",
        name: "clase",
        message: "Que tipo de componente desea ?",
        choices: productos,
        filter:( val )=>{ return val.toLowerCase(); }
    },

    {
        type: "input",
        name: "cantidad",
        message: "Ingrese la cantidad",
        validate: function( value ) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Ingrese una cantidad valida";
        },
        filter: Number
    },
    {
        type:"confirm",
        name:"seguir",
        message:"Seguir con la compra?",
    },

];


//LADO ADMIN
function operacionesCrud(){
    inquirer
        .prompt(seleccionarOperacionCrud)
        .then((respuestas) => {
                if (respuestas.crud_op === 'salir') {
                    console.log(respuestas.clave);
                    menuInicial();
                } else {
                    switch (respuestas.crud_op) {
                        case 'Consultar Productos':
                            productos.forEach(
                                (valor)=>{
                                    console.log(valor)
                                }
                            );
                            operacionesCrud();
                            break;
                        case 'Modificar Nombre Producto':
                            inquirer
                                .prompt(actualizar)
                                .then(
                                    (respuestas) => {
                                        //buscar y reemplazar

                                        productos.forEach((element,index,array) => {

                                            if (element == String(respuestas.old)) {
                                                console.log('econtrado');
                                                array[index]= respuestas.nuevo
                                            }
                                            //console.log(`${element},${respuestas.old}`);
                                        });
                                        let contenido:string='';
                                        const producto$ = rxjs.from(productos);
                                        producto$
                                            .subscribe(
                                                (ok)=>{
                                                    contenido=contenido+ok+",";
                                                },
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    AppendFile('bdd',contenido,true)
                                                        .then(
                                                            ()=>{
                                                                console.log('Base Actualizada')
                                                                operacionesCrud();
                                                            }
                                                        );

                                                }
                                            )
                                    }
                                );
                            break;
                        case 'Eliminar Productos':
                            inquirer
                                .prompt(eliminar)
                                .then(
                                    (respuestas) => {
                                        //buscar y borrar

                                        productos.forEach((element,index,array) => {

                                            if (element == String(respuestas.borrar)) {
                                                console.log('encontrado');
                                                array[index]='';
                                            }
                                            //console.log(`${element},${respuestas.borrar}`);
                                        });
                                        let contenido:string='';
                                        const producto$ = rxjs.from(productos);
                                        producto$
                                            .subscribe(
                                                (ok)=>{
                                                    if (ok) {
                                                        contenido = contenido + ok + ",";
                                                    }
                                                },
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    AppendFile('bdd',contenido,true)
                                                        .then(
                                                            ()=>{
                                                                console.log('Base Actualizada')
                                                                operacionesCrud();
                                                            }
                                                        );

                                                }
                                            )
                                    }
                                );
                            break;
                        case 'Ingresar Productos':
                            inquirer
                                .prompt(insertar)
                                .then(
                                    (respuestas) => {
                                        productos.push(respuestas.insert);
                                        let contenido:string='';
                                        const producto$ = rxjs.from(productos);

                                        producto$
                                            .subscribe(
                                                (ok)=>{
                                                    if (ok) {
                                                        contenido = contenido + ok + ",";
                                                    }
                                                },
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    AppendFile('bdd',contenido,true)
                                                        .then(
                                                            ()=>{
                                                                console.log('contenido actualizado')
                                                                operacionesCrud();
                                                            }
                                                        );

                                                }
                                            )
                                    }
                                );
                            break;
                    }
                }

            }
        );
}


//LADO CLIENTE
//function elegirComponente(pedido:Pedido) {
  //  inquirer
    //    .prompt(menuComprador2)
      //  .then(
        //    (respuestas)=>{

            //    let precio = parseFloat(respuestas.precioProducto);
          //      let producto = new Producto(respuestas.nombreProducto, precio);
        //        let cantidad = respuestas.cantidad;
      //          pedido.ordenes.push(new Orden(producto,cantidad));

    //            if (respuestas.seguir){
  //                  elegirComponente(pedido)
//                }else {

                    //console.log('+-------------------------------------------------+' +

                    //   COLOCACION DE DATOS

             //       pedido.detalle_pedido();
             //       console.log("+-------------------------------------------------+");
            //        console.log("Total: $",pedido.calcular_total());
          //      }
           // }
        //);
//}



//CLASES
class Orden{
    producto:Producto;
    cantidad;
    valorTotal=0.0;
    constructor(producto:Producto,cantidad:Number) {
        this.producto = producto;
        this.cantidad=cantidad;
        this.valorTotal=this.cantidad*this.producto.precioProducto;
    }
    public toString = () : string => {
        let espacios:string = "            ";
        return `${this.producto.nombreProducto}${espacios.substring(this.producto.nombreProducto.length)}
        ${this.cantidad}${espacios.substring(String(this.cantidad).length)}${this.producto.precioProducto}`;
    }
}

class Producto{
    nombreProducto:string;
    //size:string;
    precioProducto=0.00;
    constructor(nombreProducto:string,precio){
        this.precioProducto = precio;
        //this.size = size;
        this.nombreProducto = nombreProducto;
    }
}

class Cliente{
    nombre:string;
    //email:string;
}

class Pedido{
    cliente:Cliente;
    ordenes:Orden[]=[];
    detalle_pedido(){
        this.ordenes.forEach(
            (orden)=>{
                console.log(orden.toString())
            }
        );
    };
    calcular_total(){
        let precio_unitarios=this.ordenes.map(
            (valor)=>{
                return valor.valorTotal
            }

        );
        return precio_unitarios.reduce(
            (a,b)=>{
                return a+b;
            },0
        )
    }
}

const AppendFile = (nombreArchivo, contenido,replace?:boolean)=>{
    // @ts-ignore
    return  new Promise(
        (resolve,reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error,contenidoArchivo) => {
                    if (error) {
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            (error)=>{
                                if (error){
                                    reject(error);
                                }else {
                                    resolve(contenido)
                                }
                            }
                        );

                    } else {
                        fs.writeFile(
                            nombreArchivo,
                            replace == true? contenido:contenidoArchivo+contenido,
                            (error)=>{
                                if (error){
                                    reject(error);
                                }else {
                                    resolve(contenido)
                                }
                            }
                        );
                    }
                }
            );

        }
    );
};
menuInicial();