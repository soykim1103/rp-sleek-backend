"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_module_1 = require("../admin/admin.module");
const auth_middleware_1 = require("../admin/auth.middleware");
const admin_entity_1 = require("../admin/entities/admin.entity");
const expense_entity_1 = require("./entities/expense.entity");
const expense_controller_1 = require("./expense.controller");
const expense_service_1 = require("./expense.service");
let ExpenseModule = class ExpenseModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: "/expense/all", method: common_1.RequestMethod.GET }, { path: "/expense", method: common_1.RequestMethod.GET }, { path: "/expense", method: common_1.RequestMethod.POST });
    }
};
ExpenseModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([admin_entity_1.AdminEntity, expense_entity_1.ExpenseEntity]),
            admin_module_1.AdminModule
        ],
        controllers: [expense_controller_1.ExpenseController],
        providers: [expense_service_1.ExpenseService],
        exports: []
    })
], ExpenseModule);
exports.ExpenseModule = ExpenseModule;
//# sourceMappingURL=expense.module.js.map