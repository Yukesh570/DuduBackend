import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Moment } from "moment";
import { Product } from "../../entity/serviceList/ProductModel";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "varchar" })
  image: string;
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "integer" })
  order: number;

  @OneToMany(() => Product, (product) => product.service, { lazy: true })
  products!: Promise<Product[]>;


  @CreateDateColumn({ select: true, type: "timestamptz" })
  createdAt?: Moment;
}
