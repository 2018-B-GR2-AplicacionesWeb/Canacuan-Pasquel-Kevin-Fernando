//Importar archivos

//variable para guardar el contenido
//require --> apunta archivos de una misma carpeta
const node = require ('./nodejs.js');
const runtime = require ('./runtime');
const so = require('./so');
const util = require('./util/util');
const na = require('../01-variables');

//Importar modulos propios de nodejs
const fs = require('fs');
const express = require('express');

console.log(node);
console.log(runtime);
console.log(so);
console.log(so.archivos);
console.log(util());
console.log(na);
console.log(fs);
console.log(express);

//Se puede exportar cualquier tipo de objeto --> arreglos, json, etc

