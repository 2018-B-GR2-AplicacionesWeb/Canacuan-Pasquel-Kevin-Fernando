import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario.service";

@Module({
  imports: [],                      //modulos
  controllers: [AppController],     //controladores
  providers: [                      //servicios
      AppService,
      UsuarioService],
})
export class AppModule {}
