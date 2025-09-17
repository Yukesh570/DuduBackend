//not completed
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./serviceList/ProductModel";
import { User } from "./users/user";
import { Moment } from "moment";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;
  @Column({ type: "varchar" })
  username: string;
  @Column({ type: 'varchar', length: 255 })
  paymentMethod: string;

  @Column({ type: "text", nullable: true })
  responseData?: string;

  @CreateDateColumn({ select: true, type: "timestamptz" })
  createdAt?: Moment;
}
