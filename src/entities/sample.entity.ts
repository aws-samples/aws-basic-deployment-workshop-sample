import {Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity('Sample')
export class Sample {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    nick: string;

    @Column({ type: 'varchar', length: 50 })
    color: string;

    @CreateDateColumn()
    created_at: Date;
}
