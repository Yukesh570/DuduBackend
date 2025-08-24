import { DeepPartial, Repository, Transaction, UpdateResult } from "typeorm";
import { singleton } from "tsyringe";
import { AppDataSource } from "../data-source";
import { Cart } from "entity/cartModel";
import { Order } from "entity/orderModel";
import { TransactionDaoHelper } from "helpers/dao/transactionDaoHelper";

@singleton()
export class OrderDao extends TransactionDaoHelper<OrderDao> {
  public override repository = AppDataSource.getRepository(Order);

  create(order: Omit<Order, "id"  | "user"|"orderItems">): Promise<Order> {
    return this.repository.save(this.repository.create(order));
  }

  update(id: number, order: DeepPartial<Order>): Promise<UpdateResult> {
    return this.repository.update({ id }, order);
  }
  findById(id: number): Promise<Order | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.findOne({
      where: { id: id },
      relations:["orderItems"]
    });
  }
  getAll(userId: number): Promise<Order[]> {
    console.log("dao", userId);
    return this.repository.find({
      where: { userId },
      relations: ["orderItems"], // fetch related Service if needed
    });
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
