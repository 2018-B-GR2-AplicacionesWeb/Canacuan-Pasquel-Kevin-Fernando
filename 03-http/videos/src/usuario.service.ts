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

    actualizar(idUsuario: number, nuevoUsuario: Usuario): Usuario {
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

    buscarPorId(idUsuario:number) {
        return this.usuarios.find((u) => u.id === idUsuario);
        /*return this.usuarios.find(
            usuario) => {
                return usuario.id === idUsuario
           }
        ); */
    }

    buscarPorNombreOBiografia(busqueda:string): Usuario[] {
        return this.usuarios.filter(
            (usuario) => {
                //busqueda contiene algo del nombre
                const tieneAlgoEnElNombre = usuario
                    .nombre.includes(busqueda);

                //busqueda contiene algo de la biografia
                const tieneAlgoEnLaBiografia = usuario
                    .biografia.includes(busqueda);

                return tieneAlgoEnElNombre || tieneAlgoEnLaBiografia;
            }
        )
    }


}

export interface Usuario{
    id:number;
    nombre:string;
    biografia:string;
}
