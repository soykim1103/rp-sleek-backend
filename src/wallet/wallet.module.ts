import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common";
import { WalletController } from "./wallet.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletEntity } from "./entities/wallet.entity";
import { WalletService } from "./wallet.service";
import { WalletTransactionModule } from "src/wallet-transaction/wallet-transaction.module";

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity]), WalletTransactionModule],
  providers: [WalletService],
  controllers: [WalletController],
  exports: [WalletService]
})
export class WalletModule {}
