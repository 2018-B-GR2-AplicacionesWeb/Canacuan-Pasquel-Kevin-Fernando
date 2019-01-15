//cont NestFactory = require('@nestjs/core').NestFacory //js
import { NestFactory } from '@nestjs/core'; //ts

//import * as httserver from 'http-server'
import {Options} from 'http-server';  //js
import { AppModule } from './app.module';

//const a = require('./mi-codigo').a    //js
import {a} from "./mi-codigo";

//typescipt
//import * as session from 'express-session';
//node
const session = require('express-session');

const FileStore = require('session-file-store')(session);

import * as express from 'express';

async function bootstrap() {
    console.log(a);
    const app = await NestFactory.create(AppModule);
    app.set('view engine', 'ejs');

    app.use(
        session({
            secret: 'No sera de tomar un traguito',
            resave: false,
            saveUninitialized: true,
            cookie: {secure: true}
        })
    );


    //CONFIGURAR EL SERVIDOR WEB
    app.use(express.static('publico'));

    // @ts-ignore
    await app.listen(3000);
}
bootstrap();
