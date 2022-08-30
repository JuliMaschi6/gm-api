import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { Treatment } from './entities/treatment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Treatment])
  ],
  providers: [TreatmentService],
  controllers: [TreatmentController]
})
export class TreatmentModule {}
