import {
  IsDefined,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsEnum,
  IsArray,
  ValidateNested,
  IsDate,
} from "class-validator";
import { Type } from "class-transformer";
import { statusType } from "entity/enum/status";

export class OrderItemCreteBody {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  productId: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  quantity: number;
}

export class OrderCreateBody {


  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEnum(statusType)
  @Type(() => String)
  status: statusType;

  @IsDefined()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  estimatedDeliveryDate: Date;

  @IsDefined()
  @IsArray()
  @ValidateNested({each:true})
  @Type(() => OrderItemCreteBody)
  orderItems: OrderItemCreteBody[]
}

export class OrderEditBody {


  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(statusType)
  @Type(() => String)
  status: statusType;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  estimatedDeliveryDate: Date;

 
}

