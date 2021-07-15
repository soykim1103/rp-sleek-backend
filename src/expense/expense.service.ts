import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "src/admin/entities/admin.entity";
import { In, Repository } from "typeorm";
import { CreateExpenseDto } from "./dto/createExpense.dto";
import { ExpenseEntity } from "./entities/expense.entity";

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly config: ConfigService
  ) {}

  async createExpense(admin_id: string, createExpenseDto: CreateExpenseDto) {
    // // this.adminRepository.find({email:createExpenseDto.members})
    // const members = await this.adminRepository.find({
    //   // admin_id: { email: In(["id-1", "id-2"]) }
    //   // select: ["admin_id"],
    //   where: {
    //     email: In(createExpenseDto.members)
    //   }
    // });
    // const expense = new ExpenseEntity();
    // expense.amount = createExpenseDto.amount;
    // expense.members = members;
    // return await this.expenseRepository.save(expense);
    return Promise.resolve("Expense created");
  }

  async getExpenses(admin_id: string) {
    return await this.expenseRepository
      .createQueryBuilder("expense")
      // .leftJoin("admin", "members", "members.admin_id = :id ", {
      // id: admin_id
      // })
      .getMany();
  }
}
