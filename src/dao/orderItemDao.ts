import { DeepPartial, Repository, UpdateResult } from "typeorm";
import { singleton } from "tsyringe";
import { AppDataSource } from "../data-source";
import { Cart } from "entity/cartModel";
import { Order } from "entity/orderModel";
import { OrderItem } from "entity/orderItemModel";
import { TransactionDaoHelper } from "helpers/dao/transactionDaoHelper";

@singleton()
export class OrderItemDao extends TransactionDaoHelper<OrderItemDao> {
  public override repository = AppDataSource.getRepository(OrderItem);

  create(orderItem: Omit<OrderItem, "id" | "product"|"order">): Promise<OrderItem> {
    return this.repository.save(this.repository.create(orderItem));
  }

  update(id: number, orderItem: DeepPartial<OrderItem>): Promise<UpdateResult> {
    return this.repository.update({ id }, orderItem);
  }
  findById(id: number): Promise<OrderItem | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.findOne({
      where: { id: id },
    });
  }
  
  getAll(userId: number): Promise<OrderItem[]> {
    console.log("dao", userId);
    return this.repository.find({
    //   where: { userId },
      relations: ["product"], // fetch related Service if needed
    });
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
