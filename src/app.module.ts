import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'

import { TreatmentModule } from './modules/treatment/treatment.module';
import { CategoryModule } from './modules/category/category.module';
import { Category } from './modules/category/entities/category.entity';
import { Treatment } from './modules/treatment/entities/treatment.entity';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'gm',
      entities: [Category,Treatment],
      autoLoadEntities: true,
      // keepConnectionAlive: false,
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
