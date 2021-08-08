import { ApiProperty } from "@nestjs/swagger";

export class SampleDto {
    @ApiProperty({
        description: 'Sample Id',
    })
    id: number;

    @ApiProperty({
        description: 'Random Nick',
    })
    nick: string;

    @ApiProperty({
        description: 'Random Color',
    })
    color: string;

    @ApiProperty({
        description: 'Created date',
    })
    created_at: Date;
}
