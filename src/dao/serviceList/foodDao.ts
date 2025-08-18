// import { DeepPartial, Repository, UpdateResult } from "typeorm";
// import { singleton } from "tsyringe";
// import { Food } from "entity/serviceList/foodModel";
// import { AppDataSource } from "data-source";

// @singleton()
// export class FoodDao {
//   public repository: Repository<Food> = AppDataSource.getRepository(Food);

//   create(food: Omit<Food, "id"|"service">): Promise<Food> {
//     return this.repository.save(this.repository.create(food));
//   }

//   update(id: number, food: DeepPartial<Food>): Promise<UpdateResult> {
//     return this.repository.update({ id }, food);
//   }

//   findById(id: number): Promise<Food | null> {
//     if (!id) return Promise.resolve(null);
//     return this.repository.findOne({
//       where: { id: id },
//       relations: ["service"], // fetch related Service if needed
//     });
//   }

//   getAll(): Promise<Food[]> {
//     return this.repository.find({
//       relations: ["service"], // optional, include Service data
//     });
//   }

//   delete(id: number) {
//     return this.repository.delete({ id });
//   }
// }
