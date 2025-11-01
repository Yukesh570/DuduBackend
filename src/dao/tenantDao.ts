import { DeepPartial, Repository, UpdateResult } from "typeorm";
import { singleton } from "tsyringe";
import { AppDataSource } from "../data-source";
import { Tenant } from "../entity/tenantModel";

@singleton()
export class TenantDao {
  public repository = AppDataSource.getRepository(Tenant);

  create(Tenant: Omit<Tenant, "id"  | "user"|"tenantImages">): Promise<Tenant> {
    return this.repository.save(this.repository.create(Tenant));
  }

  update(id: number, Tenant: DeepPartial<Tenant>): Promise<UpdateResult> {
    return this.repository.update({ id }, Tenant);
  }
  
  findById(id: number): Promise<Tenant | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.findOne({
      where: { id: id },
    });
  }
  getAll(userId: number): Promise<Tenant[]> {
    console.log("dao", userId);
    return this.repository.find({
      // where: { userId: userId  },
      relations: ["user","tenantImages"],
    });
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
