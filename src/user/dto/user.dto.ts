import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";

export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  lastname!: string;

  @IsNotEmpty()
  username!: string;

  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  province!: string;

  @IsNotEmpty()
  role!: RoleType;

  @IsNotEmpty()
  profilePhoto!: string;

  @IsNotEmpty()
  token!: string | null;
}

export enum RoleType {
  USER = "USER",
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}
