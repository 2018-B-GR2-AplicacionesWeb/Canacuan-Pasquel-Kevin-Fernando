var inquirer = require('inquirer');
const rxjs = require('rxjs');
const fs = require('fs');
export class Orden {
    constructor(producto, cantidad) {
        this.valor_detalle = 0.0;
        this.toString = () => {
            let espacios = "            ";
            return `${this.producto.nombreProducto}${espacios.substring(this.producto.nombreProducto.length)}
        ${this.cantidad}${espacios.substring(String(this.cantidad).length)}${this.producto.precioProducto}`;
        };
        this.producto = producto;
        this.cantidad = cantidad;
        this.valor_detalle = this.cantidad * this.producto.precioProducto;
    }
}
