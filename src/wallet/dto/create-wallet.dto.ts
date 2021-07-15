import { IsNotEmpty } from "class-validator";

export class CreateWalletDto {
  @IsNotEmpty()
  readonly user_id: string;

  @IsNotEmpty()
  readonly balance: number;

  @IsNotEmpty()
  readonly currency: string;
}
