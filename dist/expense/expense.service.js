"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const admin_entity_1 = require("../admin/entities/admin.entity");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("./entities/expense.entity");
let ExpenseService = class ExpenseService {
    constructor(expenseRepository, adminRepository, config) {
        this.expenseRepository = expenseRepository;
        this.adminRepository = adminRepository;
        this.config = config;
    }
    async createExpense(admin_id, createExpenseDto) {
        return Promise.resolve("Expense created");
    }
    async getExpenses(admin_id) {
        return await this.expenseRepository
            .createQueryBuilder("expense")
            .getMany();
    }
};
ExpenseService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(expense_entity_1.ExpenseEntity)),
    __param(1, typeorm_1.InjectRepository(admin_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService])
], ExpenseService);
exports.ExpenseService = ExpenseService;
//# sourceMappingURL=expense.service.js.map