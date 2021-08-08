import {Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RdsService} from "./rds.service";
import {SampleDto} from "../dto/sample.dto";

@ApiTags('Database')
@Controller()
export class RdsController {
    constructor(private readonly rdsService: RdsService) {
    }

    @Post('sample')
    @ApiResponse({
        status: 201,
        description: 'Success Create Sample Data'
    })
    @ApiOperation({description: 'Create Sample Data'})
    async createSampleData(@Res() res) {
        const sampleData = await this.rdsService.createSampleData();
        return res.status(HttpStatus.CREATED).json(sampleData);
    }

    @Get('samples')
    @ApiResponse({
        status: 200,
        description: 'Success Sample Read',
        type: [SampleDto],
    })
    @ApiOperation({description: 'Videos Read'})
    async readSample(@Res() res) {
        const sampleDtos = await this.rdsService.readSample();
        return res.status(HttpStatus.OK).json(sampleDtos);
    }
}
