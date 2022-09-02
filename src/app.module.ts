import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'

import { TreatmentModule } from './modules/treatment/treatment.module';
import { CategoryModule } from './modules/category/category.module';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'gm',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true, //Se utiliza solo en ambiente de desarrollo, actualiza rapidamente los cambios en la BD
      retryDelay: 3000,
      retryAttempts: 10
    }),
    
    TreatmentModule,
    
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})

export class AppModule {}
