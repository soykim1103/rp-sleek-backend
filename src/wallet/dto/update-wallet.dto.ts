import { PartialType } from "@nestjs/swagger";
import { CreateWalletDto } from "./create-wallet.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
  @IsNotEmpty()
  readonly balance: number;

  @IsNotEmpty()
  readonly currency: string;
}
