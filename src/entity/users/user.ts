//not completed
import { Cart } from "../../entity/cartModel";
import { userType } from "../../entity/enum/userType";
import { Moment } from "moment";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from "typeorm";

// import { GenericForeignKey } from "helpers/entity/genericForeignKeyDecorator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "varchar" })
  username: string;

  @Column({ type: "varchar" ,nullable: true})
  email?: string;

  @Column({ nullable: true, type: "varchar", select: false })
  password: string | null;

  @Column({ type: "enum",enum:userType })
  userType: userType; 

  @Column({ type: "integer",nullable: true })
  points?: number;

  @Column({ type: "varchar",nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true, type: "varchar" })
  address?: string;
  @OneToMany("Cart", "user", { lazy: true })
  carts!: Relation<Promise<Cart[]>>;

  @OneToMany("Order","user", { lazy: true })
  orders!: Promise<Cart[]>;
  @CreateDateColumn({ select: true, type: "timestamptz" })
  createdAt?: Moment;
}
