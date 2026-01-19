import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_learning1',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ❗ only for development
    }), UserModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
