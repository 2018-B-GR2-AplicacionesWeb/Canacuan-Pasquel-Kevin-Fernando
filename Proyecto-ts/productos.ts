// @ts-ignore
module.exports = class productos {
    idComponete: number;
    stock: number;
    descripcion: string;
    precio: number;

    constructor(idComponente: number,stock: number, descripcion: string, precio: number) {
        this.idComponete = idComponente;
        this.stock = stock;
        this.descripcion = descripcion;
        this.precio = precio;
    }
};