import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { WalletTransactionService } from "./wallet-transaction.service";
import { CreateWalletTransactionDto } from "./dto/create-wallet-transaction.dto";

@Controller("wallet-transaction")
export class WalletTransactionController {
  constructor(
    private readonly walletTransactionService: WalletTransactionService
  ) {}

  @Post()
  create(@Body() createWalletTransactionDto: CreateWalletTransactionDto) {
    return this.walletTransactionService.create(createWalletTransactionDto);
  }

  @Get()
  findAll() {
    return this.walletTransactionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.walletTransactionService.findOne(+id);
  }
}
