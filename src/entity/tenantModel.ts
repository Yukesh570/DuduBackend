import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Relation,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./users/user"; // Assuming tenant linked to user
import { Moment } from "moment";

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 500, nullable: true })
  address: string;

  @Column({ length: 20, nullable: true })
  phoneNumber: string;

  // Optional relation to user (owner/manager of tenant)
  @Column({ type: "integer", nullable: true })
  userId: number;

  @ManyToOne("User", "tenants", { lazy: true, nullable: true })
  user!: Relation<Promise<User>>;

  // Google Maps marker location as precise decimals
  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  latitude?: number;

  @Column({ type: "decimal", precision: 10, scale: 7, nullable: true })
  longitude?: number;

//   @Column({ type: "integer", default: 0 })
//   apartmentNumber?: number; // optional extra location info

  @CreateDateColumn({ type: "timestamptz", select: true })
  createdAt?: Moment;

  @UpdateDateColumn({ type: "timestamptz", select: true })
  updatedAt?: Moment;
}
