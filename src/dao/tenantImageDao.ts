import { DeepPartial, Repository, UpdateResult } from "typeorm";
import { singleton } from "tsyringe";
import { AppDataSource } from "../data-source";
import { TenantImage } from "../entity/tenantImageModel";

@singleton()
export class TenantImageDao {
  public repository = AppDataSource.getRepository(TenantImage);

  create(TenantImage: Omit<TenantImage, "id"  | "tenant">): Promise<TenantImage> {
    return this.repository.save(this.repository.create(TenantImage));
  }

  update(id: number, TenantImage: DeepPartial<TenantImage>): Promise<UpdateResult> {
    return this.repository.update({ id }, TenantImage);
  }
  
  findById(id: number): Promise<TenantImage | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.findOne({
      where: { id: id },
    });
  }
   findByTenant(id: number): Promise<TenantImage[] | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.find({
      where: { tenantId:  id },
    });
  }
  getAll(userId: number): Promise<TenantImage[]> {
    console.log("dao", userId);
    return this.repository.find({
    });
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
