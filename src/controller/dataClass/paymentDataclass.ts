import {
  IsDefined,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class PaymentCreateBody {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount!: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  userId!: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  paymentMethod!: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  transactionId?: string;
}
