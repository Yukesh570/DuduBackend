import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class CartCreateBody {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  productId: number;


  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;
}

export class CartEditBody {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  productId?: number;


  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity?: number;
}
