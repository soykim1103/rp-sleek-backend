import { ConfigService } from "@nestjs/config";
import { AdminEntity } from "src/admin/entities/admin.entity";
import { Repository } from "typeorm";
import { CreateExpenseDto } from "./dto/createExpense.dto";
import { ExpenseEntity } from "./entities/expense.entity";
export declare class ExpenseService {
    private readonly expenseRepository;
    private readonly adminRepository;
    private readonly config;
    constructor(expenseRepository: Repository<ExpenseEntity>, adminRepository: Repository<AdminEntity>, config: ConfigService);
    createExpense(admin_id: string, createExpenseDto: CreateExpenseDto): Promise<string>;
    getExpenses(admin_id: string): Promise<ExpenseEntity[]>;
}
