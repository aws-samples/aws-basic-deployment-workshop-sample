import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeOrmConfigService} from "./typeorm.service";
import {RdsModule} from './rds/rds.module';
import {ConfigModule} from "@nestjs/config";
import { S3Module } from './s3/s3.module';

// If you have set RDS, change it to "true"
const rdsConnection = false;

@Module({
    imports: rdsConnection ? [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        }),
        RdsModule,
        S3Module,
    ] : [
        ConfigModule.forRoot({isGlobal: true}),
        S3Module,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
