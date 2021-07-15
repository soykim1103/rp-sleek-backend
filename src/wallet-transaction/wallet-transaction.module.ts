import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WalletTransactionEntity } from "./entities/wallet-transaction.entity";
import { WalletTransactionService } from "./wallet-transaction.service";
import { WalletTransactionController } from "./wallet-transaction.controller";

@Module({
  imports: [TypeOrmModule.forFeature([WalletTransactionEntity])],
  providers: [WalletTransactionService],
  controllers: [WalletTransactionController],
  exports: [WalletTransactionService]
})
export class WalletTransactionModule {}
