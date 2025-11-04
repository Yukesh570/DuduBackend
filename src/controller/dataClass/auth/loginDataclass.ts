import { Transform, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { userType } from "../../../entity/enum/userType";

export class UserCreateDataClass {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Transform(({ value }) => (value ? value.toLowerCase() : null), {
    toClassOnly: true,
  })
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password: string;

  @IsDefined()
  @IsString()
  @IsEnum(userType)
  @Type(() => String)
  userType: userType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  phoneNumber: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  address: string;
}
export class UserDataClass {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Transform(({ value }) => (value ? value.toLowerCase() : null), {
    toClassOnly: true,
  })
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password: string;
}
export class UserEditDataClass {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  @Transform(({ value }) => (value ? value.toLowerCase() : null), {
    toClassOnly: true,
  })
  username: string;

  @IsOptional()
  @IsString()
  @IsEnum(userType)
  @Type(() => String)
  userType: userType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  phoneNumber: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  address: string;
}


export class changePasswordDataClass {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  password: string;

}