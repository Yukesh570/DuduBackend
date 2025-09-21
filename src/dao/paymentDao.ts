import { DeepPartial, ILike, Repository, UpdateResult } from "typeorm";
import { singleton } from "tsyringe";
import { AppDataSource } from "../data-source";
import { Payment } from "../entity/paymentModel";

@singleton()
export class PaymentDao {
  public repository = AppDataSource.getRepository(Payment);

  create(payment: Omit<Payment, "id">): Promise<Payment> {
    return this.repository.save(this.repository.create(payment));
  }

  update(id: number, payment: DeepPartial<Payment>): Promise<UpdateResult> {
    return this.repository.update({ id }, payment);
  }
  findById(id: number): Promise<Payment | null> {
    if (!id) return Promise.resolve(null);
    return this.repository.findOne({
      where: { id: id },
    });
  }
  getAll(): Promise<Payment[]> {
  return this.repository.find({
 
  });
}
// getByName(name:string): Promise<Payment | null> {
//   console.log("asdfasdfasdfasdfsadfa",name)
//   return this.repository.findOne({
//   where: { name: ILike(name) } // TypeORM ILike for Postgres case-insensitive 
//   });
// }

  delete(id: number) {
    return this.repository.delete({ id });
  }




}