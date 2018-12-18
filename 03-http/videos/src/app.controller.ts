import {
    Get,
    Controller,
    Request,
    Response,
    HttpCode,
    HttpException,
    Query,
    Param,
    Res,
    Post,
    Body
} from '@nestjs/common';
import { AppService } from './app.service';
import {rejects} from "assert";
import {Observable, of} from "rxjs";
import {UsuarioService} from "./usuario.service";
import {Usuario} from "./mi-codigo";

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
    constructor(
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
        @Res() response,
        //recibir los parametros de actualizar
        @Query('accion') accion:string,
        @Query('nombre') nombre:string,
        @Query('busqueda') busqueda:string,
    ) {
        let mensaje;
        
        if(accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    mensaje = `Registro ${nombre} actualizado`;
                    break;
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
                case 'crear':
                    mensaje = `Registro ${nombre} creado`;
                    break;
            }
        }

        let usuarios: Usuario[];
        if(busqueda) {
            usuarios = this._usuarioService.buscarPorNombreOBiografia(busqueda);
        }else {
            usuarios = this._usuarioService.usuarios
        }
        response.render('inicio', {
            nombre: 'Kevin',
            arreglo: usuarios,
            mensaje:mensaje 
        });
    }

    @Post('borrar/:idUsuario')
    borrar(
        @Param('idUsuario') idUsuario,
        @Res() response
    ) {
        const usuario = this._usuarioService
            .borrar(Number(idUsuario));
        // @ts-ignore
        const parametrosConsulta = `?accion=borrar&nombre=${usuario.nombre}`;

        response.redirect('/Usuario/inicio'+parametrosConsulta);
    }

    @Get('crear-usuario')
    crearUsuario(
        @Res() response
    ) {
        response.render(
            'crear-usuario.ejs'
        )
    }

    @Get('actualizar-usuario/:idUsuario')
    actualizarUsuario(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioAActualizar = this._usuarioService
            .buscarPorId(Number(idUsuario));
        response.render(
            'crear-usuario.ejs', {
                usuario: usuarioAActualizar
            }
        )
    }

    @Post('crear-usuario')
    crearUsuarioFormulario(
        @Body() usuario: Usuario,
        @Res() response
    ) {
        // @ts-ignore
        this._usuarioService.crear(usuario);
        // @ts-ignore
        const parametrosConsulta = `?accion=crear&nombre=${usuario.nombre}`;
        response.redirect('/Usuario/inicio'+parametrosConsulta)
    }

    @Post('actualizar-usuario/:idUsuario')
    actualizarUsuarioFormulario(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Body() usuario: Usuario
    ) {
        // @ts-ignore
        usuario.id = +idUsuario;

        // @ts-ignore
        this._usuarioService.actualizar(+idUsuario, usuario);

        //para enviar datos en una url se utiliza parametros de consulta
        // @ts-ignore
        const parametrosConsulta = `?accion=actualizar&nombre=${usuario.nombre}`;
        response.redirect('/Usuario/inicio'+parametrosConsulta);

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