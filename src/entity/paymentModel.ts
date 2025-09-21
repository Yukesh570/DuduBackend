//not completed
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./serviceList/ProductModel";
import { User } from "./users/user";
import { Moment } from "moment";
import { paymentstatusType } from "./enum/paymentStatus";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;
  @Column({ type: "varchar", nullable: true })
  userId: string;

  @Column({ type: "varchar", length: 255 })
  paymentMethod: string;

  @Column({ type: "simple-json", nullable: true })
  productIds?: number[];

  @Column({ type: "enum", enum: paymentstatusType , default: paymentstatusType.FAILED})
  paymentstatus: paymentstatusType;

  @Column({ type: "text", nullable: true })
  transactionId?: string;
  @CreateDateColumn({ select: true, type: "timestamptz" })
  createdAt?: Moment;
}
