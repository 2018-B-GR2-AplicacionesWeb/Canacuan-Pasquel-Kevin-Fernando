// 02-observables.ts

declare var require:any;
//declare var Promise:any;
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const distinct = require('rxjs/operators').distinct;
const concat = require('rxjs/operators').concat;

const numeros$ = rxjs.of(
    1,
    true,
    2,
    'Kevin',
    3,
    {nombre: 'Kevin'},
    2,
    ['oli'],
    2,
    function () {
    });

//console.log(numeros$);
 numeros$
     .pipe(
         distinct(),
         map(
             (valorActual) => {
                 return {
                     data:valorActual
                 };
             }
         )
     )
     .subscribe(
         (ok)=>{
             console.log('En ok',ok);
         },
         (error)=>{
             console.log('Error:',error);
         },
         ()=>{
             console.log('Complete');
         },
    );



 const promesita = (funciona:boolean): Promise<string> => {
     return new Promise(
         (resolve, reject) => {
             if(funciona) {
                 resolve('  :)  ');
             } else {
                 reject('  :(  ');
             }
         }
     );
 };

 //Usar promesas dentro de observables
//Con el $ al final se lo convierte en observable

const promesita$ = rsjx.from(promesita(true));

promesita$
    .subscribe(
        (ok) => {
            console.log('Promesita bien', ok);
        },
        (error) => {
            console.log('Promesita mal', error);
        },
        () => {
            console.log('Completado');
        }
    );

const observableConcatenado$ = numeros$
    .pipe(
        concat(promesita$)
    );

observableConcatenado$
    .subscribe(
        (ok) => {
        console.log('Concatenado bien', ok);
    },
    (error) => {
        console.log('Error', error);
    },
        () => {
        console.log('Completado');
    }
);