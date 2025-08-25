import { DeepPartial, Repository, Transaction, UpdateResult } from "typeorm";
import { singleton } from "tsyringe";
import { AppDataSource } from "../data-source";
import { Cart } from "entity/cartModel";
import { Order } from "entity/orderModel";
import { TransactionDaoHelper } from "helpers/dao/transactionDaoHelper";
import { statusType } from "entity/enum/status";

 
@singleton()
export class OrderDao extends TransactionDaoHelper<OrderDao> {
  public override repository = AppDataSource.getRepository(Order);

  create(order: Omit<Order, "id" | "user" | "orderItems">): Promise<Order> {
    return this.repository.save(this.repository.create(order));
  }

  update(id: number, order: DeepPartial<Order>): Promise<UpdateResult> {
    return this.repository.update({ id }, order);
  }
  findById(id: number): Promise<Order | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.findOne({
      where: { id: id },
      relations: ["orderItems"],
    });
  }
  getAll(userId: number, status: statusType|undefined): Promise<Order[]> {
    console.log("dao", userId);
    if (!status){
      return this.repository.find({
        where: { userId: userId },
        relations: ["orderItems", "orderItems.product"], // fetch related Service if needed
      });
    }
    return this.repository.find({
      where: { userId: userId, status: status },
      relations: ["orderItems", "orderItems.product"], // fetch related Service if needed
    });
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
