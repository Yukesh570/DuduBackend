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
import { categoryType } from "../../../entity/enum/category";

export class ProductCreateBody {


  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEnum(categoryType)
  @Type(() => String)
  category: categoryType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  type: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  description: string;



 

  @IsDefined()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  rate: number;

  @IsDefined()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  count: number;
}

export class ProductEditBody {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  image?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  video?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEnum(categoryType)
  @Type(() => String)
  category: categoryType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  type: string;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  description?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  serviceId?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  order?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  rate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  count?: number;
}
