import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./user.service";
import { AuthMiddleware } from "./auth.middleware";
import { WalletModule } from "src/wallet/wallet.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), WalletModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: "user", method: RequestMethod.GET });
  }
}
