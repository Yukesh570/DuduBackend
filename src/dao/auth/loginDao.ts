import { User } from "entity/users/user";
import { AppDataSource } from "../../data-source";
import { singleton } from "tsyringe";
import { DeepPartial, UpdateResult } from "typeorm";

@singleton()
export class LoginDao {
  public repository = AppDataSource.getRepository(User);

  create(login: Omit<User, "id"|"carts"|"orders">): Promise<User> {
    return this.repository.save(this.repository.create(login));
  }

  update(id: number, user: DeepPartial<User>): Promise<UpdateResult> {
    return this.repository.update({ id }, user);
  }
}