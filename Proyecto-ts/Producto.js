var inquirer = require('inquirer');
const rxjs = require('rxjs');
const fs = require('fs');
export class Producto {
    constructor(nombreProducto, precio) {
        //size:string;
        this.precioProducto = 0.00;
        this.precioProducto = precio;
        //this.size = size;
        this.nombreProducto = nombreProducto;
    }
}
