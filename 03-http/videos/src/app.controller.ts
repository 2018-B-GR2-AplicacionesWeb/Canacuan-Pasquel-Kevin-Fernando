import {Get, Controller, Request, Response, HttpCode, HttpException, Query, Param, Res, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {rejects} from "assert";
import {Observable, of} from "rxjs";
import {UsuarioService} from "./usuario.service";

//http:://192.168.1.2:3000/Usuario/saludar    METODO -> get, post, delete
//http:://192.168.1.2:3000/Usuario/salir
//http:://192.168.1.2:3000/Usuario/registrar
//http:://192.168.1.2:3000/Usuario/borrar
//http:://192.168.1.2:3000/Notas

//Decoradores -> funcion que se ejecuta antes de algo
//Funcionan en: clases, metodos, propiedades, parametros

//Dentro del controlador solo debe existir el request y el responde

@Controller('Usuario')

export class AppController {

    //CONSTRUCTOR NO ES UN CONTRUCTOR NORMAL !!
    constructor (
        private readonly _usuarioService: UsuarioService,
    ) {

    }

  @Get('saludar')
  saludar(
      @Query() queryParams,
      @Query('nombre') nombre
  ): string {
      return nombre
  }

  @Get('despedirse')
  @HttpCode(201)
  despedirse(): Promise<string> {
      return new Promise<string>(
            (resolve, reject) => {
                //resolve('Adios');
                throw new HttpException({
                    mensaje: 'Error en despedirse',
                },
                400);
            }
        )
  }


  // /Usuario/segmentoUno/12/segmentoDos
  @Get('segmentoUno/:idUsuario/segmentoDos/')
  ruta(
      @Param() todosParametrosRuta,
      @Param('idUsuario') idUsuario,
  ): string {
      return idUsuario;
  }

  @Get('tomar')
  @HttpCode(201)
  tomar(): string {
      return 'Estoy borracho'
  }

    @Get('saludarObservable')
    saludarObservable(): Observable<string> {
        return of('Hola Mundo');
    }

    @Get('inicio')
    inicio(
        //devolver codigo html
        // header 1 -> titulo importante
        @Res() response
    ) {
      response.render('inicio', {
          nombre: 'Kevin',
          arreglo: this._usuarioService.usuarios
      });
    }

    @Post('borrar/:idUsuario')
    borrar(
        @Param('idUsuario') idUsuario,
        @Res() response
    ) {
        this._usuarioService.borrar(Number(idUsuario));
      response.redirect('/Usuario/inicio');
    }
}


/*
@Controller('Usuario')
export class AppController {
  @Get('saludar')
  root(
      @Request() req,
      @Response() res,
  ) {
      res.send('Hola mundo')
  }
}
 */