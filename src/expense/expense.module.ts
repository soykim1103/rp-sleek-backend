import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "src/admin/admin.module";
import { AuthMiddleware } from "src/admin/auth.middleware";
import { AdminEntity } from "src/admin/entities/admin.entity";
import { ExpenseEntity } from "./entities/expense.entity";
import { ExpenseController } from "./expense.controller";
import { ExpenseService } from "./expense.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, ExpenseEntity]),
    AdminModule
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: []
})
export class ExpenseModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: "/expense/all", method: RequestMethod.GET },
        { path: "/expense", method: RequestMethod.GET },
        { path: "/expense", method: RequestMethod.POST }
      );
  }
}
