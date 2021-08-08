import { Module } from '@nestjs/common';
import { RdsController } from './rds.controller';
import { RdsService } from './rds.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Sample} from "../entities/sample.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Sample])
  ],
  controllers: [RdsController],
  providers: [RdsService]
})
export class RdsModule {}
