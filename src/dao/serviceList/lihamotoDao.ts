// import { DeepPartial, Repository, UpdateResult } from "typeorm";
// import { singleton } from "tsyringe";
// import { AppDataSource } from "data-source";
// import { LiHaMoto } from "entity/serviceList/LiHaMotoModel";

// @singleton()
// export class LiHaMotoDao {
//   public repository: Repository<LiHaMoto> = AppDataSource.getRepository(LiHaMoto);

//   create(lihamoto: Omit<LiHaMoto,"id"|"service">): Promise<LiHaMoto> {
//     return this.repository.save(this.repository.create(lihamoto));
//   }

//   update(id: number, lihamoto: DeepPartial<LiHaMoto>): Promise<UpdateResult> {
//     return this.repository.update({ id }, lihamoto);
//   }

//   findById(id: number): Promise<LiHaMoto | null> {
//     if (!id) return Promise.resolve(null);
//     return this.repository.findOne({
//       where: { id: id },
//       relations: ["service"], // fetch related Service if needed
//     });
//   }

//   getAll(): Promise<LiHaMoto[]> {
//     return this.repository.find({
//       relations: ["service"], // optional, include Service data
//     });
//   }

//   delete(id: number) {
//     return this.repository.delete({ id });
//   }
// }
