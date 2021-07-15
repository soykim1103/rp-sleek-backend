import { IsNotEmpty, IsEmail } from "class-validator";

export class RegisterNewUserDto {
  @IsNotEmpty()
  readonly firstname: string;
  @IsNotEmpty()
  readonly lastname: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly country: string;
  @IsNotEmpty()
  readonly currency: string;
  @IsNotEmpty()
  readonly password: string;
}
