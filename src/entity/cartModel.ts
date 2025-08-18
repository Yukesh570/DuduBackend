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
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  // @ManyToOne(() => Product, (product) => product.carts, { lazy: true })
  // product!: Relation<Promise<Product>>;
  @Column({ type: "integer", nullable: true  })
  productId: number;
  @ManyToOne("Product", "carts", { lazy: true })
  product!: Relation<Promise<Product>>;
  @Column({ type: "integer", nullable: true  })
  userId: number;
  @ManyToOne("User", "carts", { lazy: true })
  user!: Relation<Promise<User>>;

  @Column({ type: "integer" })
  quantity: number;
  @CreateDateColumn({ select: true, type: "timestamptz" })
  createdAt?: Moment;

}

// @ManyToOne("Reward", "RewardLogs", { lazy: true })
//   reward!: Relation<Promise<Reward>>;

//  @OneToMany("Reward", "User", { lazy: true })
// reward!: Relation<Promise<Reward[]>>;
