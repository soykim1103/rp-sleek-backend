import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { TopupWalletDto } from "./dto/wallet-topup.dto";

@Controller("wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get(":user_id")
  findOne(@Param("user_id") user_id: string) {
    return this.walletService.findOne(user_id);
  }

  @Post("/topup")
  topup(@Body() topupWalletDto: TopupWalletDto) {
    return this.walletService.topup(topupWalletDto);
  }

  @Post("/chargeWallet")
  chargeWallet(@Body() topupWalletDto: TopupWalletDto) {
    return this.walletService.chargeWallet(topupWalletDto);
  }
}
