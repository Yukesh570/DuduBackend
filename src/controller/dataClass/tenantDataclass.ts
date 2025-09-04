import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class TenantCreateBody {

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  address: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  phoneNumber: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  latitude: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  longitude: number;
}

export class TenantEditBody {

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  address: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  phoneNumber: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  latitude: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  longitude: number;
}
