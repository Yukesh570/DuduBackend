import { DeepPartial, Repository, UpdateResult } from "typeorm";
import { singleton } from "tsyringe";
import { AppDataSource } from "../data-source";
import { Cart } from "entity/cartModel";


@singleton()
export class CartDao {
  public repository = AppDataSource.getRepository(Cart);

  create(cart: Omit<Cart, "id"|"product"|"user">): Promise<Cart> {
    return this.repository.save(this.repository.create(cart));
  }

  update(id: number, cart: DeepPartial<Cart>): Promise<UpdateResult> {
    return this.repository.update({ id }, cart);
  }
  findById(id: number): Promise<Cart | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.findOne({
      where: { id: id },
    });
  }
  getAll(userId: number): Promise<Cart[]> {
    console.log("dao",userId);
  return this.repository.find({
    where:{userId}
  });
}

  delete(id: number) {
    return this.repository.delete({ id });
  }




}