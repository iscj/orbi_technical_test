import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // Importar HttpModule
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
