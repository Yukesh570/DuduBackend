import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";

import { Moment } from "moment";
import { Service } from "../../entity/service/service";
import { Cart } from "../../entity/cartModel";
import { categoryType } from "../../entity/enum/category";
import { OrderItem } from "entity/orderItemModel";
import { User } from "../users/user";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "varchar",nullable:true })
  image: string;
  @Column({ type: "varchar",nullable:true })
  video: string;
  @Column({ type: "varchar" })
  name: string;
  @Column({ type: "enum", enum: categoryType })
  category: categoryType;
  @Column({ type: "varchar" })
  description: string;
  @Column({ type: "integer" })
  order: number;
  @Column({ type: "integer" })
  price: number;
  @Column({ type: "integer" })
  rate: number;
  @Column({ type: "integer" })
  count: number;
  @Column({ type: "varchar", nullable: true })
  type?: string;

  @Column({ type: "integer", nullable: true  })
  serviceId: number;
  @ManyToOne("Service","products", { lazy: true })
  service!: Relation<Promise<Service>>;

  @Column({ type: "integer", nullable: true  })
  userId: number;
  @ManyToOne("User","products", { lazy: true })
  user!: Relation<Promise<User>>;


  @OneToMany("Cart", "product", { lazy: true })
  carts!: Relation<Promise<Cart[]>>;
  // @OneToMany("OrderItems", "product", { lazy: true })
  // orderItems!: Relation<Promise<OrderItem[]>>;
  @OneToMany( "OrderItem", "product", { lazy: true })
  orderItems!: Promise<Cart[]>;

 
  @CreateDateColumn({ select: true, type: "timestamptz" })
  createdAt?: Moment;
}

