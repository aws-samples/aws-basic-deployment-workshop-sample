import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';
import * as AWS from "aws-sdk";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor() {
    }

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const databaseCredential = await this.getDatabaseCredential();
        const {host, port, username, password} = databaseCredential;
        return {
            type: 'mysql' as const,
            host,
            port,
            username,
            database: process.env.DATABASE_NAME,
            password,
            entities: [process.env.PWD + '/dist/**/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }

    getDatabaseCredential(): Promise<any> {
        const client = new AWS.SecretsManager({
            region: process.env.AWS_REGION
        });
        return new Promise((resolve, reject) => {
            client.getSecretValue({SecretId: process.env.AWS_DB_SECRET_ID}, (err, data) => {
                if (err) reject(err);
                if ("SecretString" in data) {
                    const secret = data.SecretString;
                    resolve(JSON.parse(secret));
                }
            });
        });
    }
}
