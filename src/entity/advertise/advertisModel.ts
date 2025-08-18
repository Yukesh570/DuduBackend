import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Moment } from "moment";


@Entity()
export class Advertise {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "varchar" })
  video: string;
  @CreateDateColumn({ select: true, type: "timestamptz" })
  createdAt?: Moment;
}
