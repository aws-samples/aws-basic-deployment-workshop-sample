import {Injectable} from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
    get s3Bucket() {
        return new AWS.S3();
    };

    async fileUploadToS3(file: any): Promise<string> {
        console.log(file);
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `${file.originalname}`,
            Body: file.buffer
        };
        return new Promise((resolve, reject) => {
            const putObjectInS3 = this.s3Bucket.upload(params).promise();
            putObjectInS3.then((data) => {
                if (data == undefined) resolve(`Upload failed!`);
                else resolve(`Success Upload! Key: ${data.Key}`);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }

}
