import { DeepPartial, ILike, Repository, UpdateResult } from "typeorm";
import { singleton } from "tsyringe";
import { AppDataSource } from "../data-source";
import { Service } from "../entity/service/service";

@singleton()
export class ServiceDao {
  public repository = AppDataSource.getRepository(Service);

  create(service: Omit<Service, "id"|"products">): Promise<Service> {
    return this.repository.save(this.repository.create(service));
  }

  update(id: number, service: DeepPartial<Service>): Promise<UpdateResult> {
    return this.repository.update({ id }, service);
  }
  findById(id: number): Promise<Service | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.findOne({
      where: { id: id },
    });
  }
  getAll(): Promise<Service[]> {
  return this.repository.find({
    order: {
      order: 'ASC', 
    },
  });
}
getByName(name:string): Promise<Service | null> {
  console.log("asdfasdfasdfasdfsadfa",name)
  return this.repository.findOne({
  where: { name: ILike(name) } // TypeORM ILike for Postgres case-insensitive 
  });
}

  delete(id: number) {
    return this.repository.delete({ id });
  }




}