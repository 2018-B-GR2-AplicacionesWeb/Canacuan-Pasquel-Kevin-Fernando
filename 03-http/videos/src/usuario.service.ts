//decorador injectacle ->
//

import {Injectable} from "@nestjs/common";

@Injectable()
// se mueve la logica del controlador a los servicios
export class UsuarioService {
    usuarios: Usuario[] = [
        {
            nombre:'Kevin',
            biografia:'Doctor',
            id:1
        },
        {
            nombre:'Fernando',
            biografia:'Maestro',
            id:2
        },
        {
            nombre:'Carla',
            biografia:'Arquitecta',
            id:3
        }
    ];

    registroActual = 4;

    crear(nuevoUsuario: Usuario): Usuario {
        nuevoUsuario.id = this.registroActual;
        this.registroActual++;
        this.usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }

    actualizar(idUsuario:number, nuevoUsuario: Usuario): Usuario {
        const indiceUsuario = this.usuarios.findIndex(
            (usuario) => usuario.id === idUsuario);
        this.usuarios[indiceUsuario] = nuevoUsuario;
        return nuevoUsuario;
    }

    borrar(idUsuario:number): Usuario {
        const indiceUsuario = this.usuarios.findIndex(
            (usuario) => usuario.id === Number(idUsuario)
        );
        //se clona el usuario borrado
        const usuarioBorrado = JSON.parse(JSON.stringify(
            this.usuarios[indiceUsuario]));
        this.usuarios.splice(indiceUsuario,1);
        return usuarioBorrado;
    }
}

interface Usuario{
    id:number;
    nombre:string;
    biografia:string;
}
