import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
