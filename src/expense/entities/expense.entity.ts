import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("expense")
export class ExpenseEntity extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 200 })
  expense_id: string;

  @PrimaryColumn({ type: "varchar", length: 200 })
  admin_id: string;

  @Column({ type: Number, default: null })
  amount: number;

  @Column({ type: "varchar", length: 5, default: null })
  currency: string;

  @Column({ type: "varchar", length: 100, default: null })
  userid: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updated_at: Date;

  @BeforeInsert()
  generateId() {
    const uuid = uuidv4().replace(/-/g, "");
    this.expense_id = `${uuid}`;
  }
}
