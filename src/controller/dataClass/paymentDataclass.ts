import {
  IsDefined,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";
import { paymentstatusType } from "entity/enum/paymentStatus";

export class PaymentCreateBody {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount!: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEnum(paymentstatusType)
  @Type(() => String)
  paymentstatus: paymentstatusType;

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
