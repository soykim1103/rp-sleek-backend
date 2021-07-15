import { IsNotEmpty } from "class-validator";

export class TopupWalletDto {
  @IsNotEmpty()
  readonly user_id: string;

  @IsNotEmpty()
  readonly wallet_id: string;

  @IsNotEmpty()
  readonly amount: number;

  @IsNotEmpty()
  readonly currency: string;
}
