import { CreateExpenseDto } from "./dto/createExpense.dto";
import { ExpenseService } from "./expense.service";
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    allExpenses(admin_id: string): Promise<import("./entities/expense.entity").ExpenseEntity[]>;
    newExpense(admin_id: string, createExpenseDto: CreateExpenseDto): Promise<string>;
}
