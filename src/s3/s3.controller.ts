import {Controller, HttpStatus, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {S3Service} from "./s3.service";
import {FileUploadDTO} from "../dto/file-upload.dto";
import {FileInterceptor} from "@nestjs/platform-express";
@ApiTags('S3')

@Controller()
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {
    }

    @Post('upload')
    @ApiOperation({description: 'File Upload'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'FIle',
        type: FileUploadDTO,
    })
    @ApiResponse({
        status: 200,
        description: 'Success File Upload',
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Res() res, @UploadedFile() file) {
        const result = await this.s3Service.fileUploadToS3(file);
        return res.status(HttpStatus.OK).json(result);
    }
}
