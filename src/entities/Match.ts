import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "matches"})
export class Team{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Team, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({
        name: "idhost",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_host_id"
    })
    host: Team;

    @ManyToOne(() => Team, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({
        name: "idvisitor",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_visitor_id"
    })
    visitor: Team;

    @Column({nullable:false, type:'date', default:() => "CURRENT_TIMESTAMP"})
    date: Date;
}