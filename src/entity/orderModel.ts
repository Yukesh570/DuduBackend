//not completed
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
import { User } from "./users/user";
import { statusType } from "./enum/status";
import { OrderItem } from "./orderItemModel";

// import { GenericForeignKey } from "helpers/entity/genericForeignKeyDecorator";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;
 
  @ManyToOne(() => User, (user) => user.orders, { lazy: true })
  user!: Relation<Promise<User>>;

   @Column({ type: "enum",enum:statusType })
   status: statusType; 

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { lazy: true })
    orderItems!: Promise<OrderItem[]>;
  @CreateDateColumn()
  createdAt: Date;

}
