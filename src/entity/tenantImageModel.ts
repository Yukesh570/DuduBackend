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
import { Tenant } from "./tenantModel";


@Entity()
export class TenantImage{
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: "varchar",nullable:true })
  image: string;
  @Column({ type: "integer", nullable: true  })
  tenantId: number;
  @ManyToOne("Tenant", "tenantImages" , { lazy: true })
  tenant!: Relation<Promise<Tenant>>;
  @CreateDateColumn({ select: true, type: "timestamptz" })
  createdAt?: Moment;
}