import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class TenantImageCreateBody {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  image: string;



  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  tenantId: number;


}

export class TenantImageEditBody {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  image: string;



  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  tenantId: number;
}
