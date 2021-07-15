import { IsNotEmpty, IsEmail } from "class-validator";

export class LoginAdminDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
