import {Injectable} from '@nestjs/common';
import {SampleDto} from "../dto/sample.dto";
import {Sample} from "../entities/sample.entity";
import {animals, colors, uniqueNamesGenerator} from "unique-names-generator";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class RdsService {
    constructor(
        @InjectRepository(Sample)
        private readonly sampleRepository: Repository<Sample>,
    ) {
    }

    async createSampleData(): Promise<any> {
        await this.createSample();
        return this.readSample();
    }

    async createSample(): Promise<SampleDto> {
        const newSample = new Sample();
        newSample.nick = uniqueNamesGenerator({dictionaries: [animals]});
        newSample.color = uniqueNamesGenerator({dictionaries: [colors]});
        return this.sampleRepository.save(newSample);
    }

    async readSample(): Promise<SampleDto[]> {
        return this.sampleRepository.find({order: {created_at: 'DESC'}});
    }
}
