import { DeepPartial, ILike, In, Repository, UpdateResult } from "typeorm";
import { singleton } from "tsyringe";
import { AppDataSource } from "../../data-source";
import { Product } from "../../entity/serviceList/ProductModel";
import { categoryType } from "../../entity/enum/category";

@singleton()
export class ProductDao {
  public repository: Repository<Product> = AppDataSource.getRepository(Product);

  create(product: Omit<Product, "id" | "service"|"carts"|"orderItems"|"user">): Promise<Product> {
    return this.repository.save(this.repository.create(product));
  }


  update(id: number, product: DeepPartial<Product>): Promise<UpdateResult> {
    return this.repository.update({ id }, product);
  }

  findById(id: number): Promise<Product | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.findOne({
      where: { id: id },
      relations: ["service"], // fetch related Service if needed
    });
  }

  getByCategory(category:categoryType): Promise<Product[]> {
    return this.repository.find({
      where: { category},
      relations: ["service"], // optional, include Service data
    });
  }
  getByName(name:string): Promise<Product | null> {
    console.log("asdfasdfasdfasdfsadfa",name)
    return this.repository.findOne({
    where: { name: ILike(name) } // TypeORM ILike for Postgres case-insensitive 
    });
  }

   getByEachLetter(name: string): Promise<Product[]> {
  console.log("searching by:", name);

  return this.repository.find({
    where: { name: ILike(`${name}%`) },
    order: { name: "ASC" },    
    select: ["id", "name", "image", "category"]        
  });
}

  getMultiple(ids:number[]): Promise<Product[]|null> {
    return this.repository.find({
      where: { id:In(ids), },
    });
  }
    getOne(id:number): Promise<Product|null> {
    return this.repository.findOne({
      where: { id, },
      relations: ["service"], // optional, include Service data
    });
  }
   getAll(): Promise<Product[]|null> {
    return this.repository.find({

    });
  }

  delete(id: number) {
    return this.repository.delete({ id });
  }
}
