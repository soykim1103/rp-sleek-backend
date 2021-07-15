import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AdminModule } from "./admin/admin.module";
import { ExpenseModule } from "./expense/expense.module";
import { UserModule } from "./user/user.module";
import { WalletModule } from "./wallet/wallet.module";
import { WalletTransactionModule } from "./wallet-transaction/wallet-transaction.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    AdminModule,
    ExpenseModule,
    UserModule,
    WalletModule,
    WalletTransactionModule
  ]
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}
  public configure(consumer: MiddlewareConsumer) {}
}
