//cont NestFactory = require('@nestjs/core').NestFacory //js
import { NestFactory } from '@nestjs/core'; //ts

//import * as httserver from 'http-server'
import {Options} from 'http-server';  //js
import { AppModule } from './app.module';

//const a = require('./mi-codigo').a    //js
import {a} from "./mi-codigo";

async function bootstrap() {
  console.log(a);
  const app = await NestFactory.create(AppModule);
  app.set('view engine', 'ejs');
  await app.listen(3000);
}
bootstrap();
