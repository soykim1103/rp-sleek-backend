import { IsNotEmpty } from "class-validator";

export class CreateExpenseDto {
  @IsNotEmpty()
  userid: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  currency: number;
}
