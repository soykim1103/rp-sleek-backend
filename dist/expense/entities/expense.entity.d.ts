import { BaseEntity } from "typeorm";
export declare class ExpenseEntity extends BaseEntity {
    expense_id: string;
    admin_id: string;
    amount: number;
    currency: string;
    userid: string;
    created_at: Date;
    updated_at: Date;
    generateId(): void;
}
