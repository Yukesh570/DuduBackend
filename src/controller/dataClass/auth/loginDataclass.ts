import { Transform, Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { userType } from "entity/enum/userType";

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

  // @IsDefined()
  // @IsString()
  // @IsEnum(userType)
  // @Type(() => String)
  // userType: userType;
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