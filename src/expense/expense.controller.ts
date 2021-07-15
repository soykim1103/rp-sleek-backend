import { Body, Controller, Get, Post } from "@nestjs/common";
import { Admin } from "src/admin/admin.decorator";
import { CreateExpenseDto } from "./dto/createExpense.dto";
import { ExpenseService } from "./expense.service";

@Controller("expense")
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}
  @Get("all")
  async allExpenses(
    @Admin("admin_id")
    admin_id: string
  ) {
    return this.expenseService.getExpenses(admin_id);
  }

  @Post()
  async newExpense(
    @Admin("admin_id")
    admin_id: string,
    @Body() createExpenseDto: CreateExpenseDto
  ) {
    return this.expenseService.createExpense(admin_id, createExpenseDto);
  }
}
