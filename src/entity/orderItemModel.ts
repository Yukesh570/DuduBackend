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
import { User } from "./users/user";
import { statusType } from "./enum/status";
import { Order } from "./orderModel";
import { Product } from "./serviceList/ProductModel";

// import { GenericForeignKey } from "helpers/entity/genericForeignKeyDecorator";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { lazy: true })
  order!: Relation<Promise<Order>>;

  @ManyToOne(() => Product, (product) => product.orderItems, { lazy: true })
  product!: Relation<Promise<Product>>;
  @Column({ type: "int", default: 1 })
  quantity: number;
  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  createdAt: Date;
}
