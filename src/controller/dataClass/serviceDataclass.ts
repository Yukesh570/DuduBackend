import {
  IsDefined,
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class ServiceCreateBody {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  image: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  order: number;
}

export class ServiceEditBody {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  image?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  order?: number;
}
