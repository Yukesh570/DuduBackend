import { User } from "../../entity/users/user";
import { AppDataSource } from "../../data-source";
import { singleton } from "tsyringe";
import { DeepPartial, UpdateResult } from "typeorm";

@singleton()
export class LoginDao {
  public repository = AppDataSource.getRepository(User);

  create(
    login: Omit<User, "id" | "carts" | "orders" | "products">
  ): Promise<User> {
    return this.repository.save(this.repository.create(login));
  }

  update(id: number, user: DeepPartial<User>): Promise<UpdateResult> {
    return this.repository.update({ id }, user);
  }

  findById(id: number): Promise<User | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.findOne({
      where: { id: id },
    });
  }

  getAll(): Promise<User[]> {
    return this.repository.find({
     
    });
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
