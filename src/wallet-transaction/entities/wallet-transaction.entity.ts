import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { IsJWT } from "class-validator";

@Entity("wallet_transaction")
export class WalletTransactionEntity {
  @PrimaryColumn({ type: "varchar", length: 200 })
  wallet_transaction_id: string;

  @Column({ type: "varchar", length: 200 })
  user_id: string;

  @Column({ type: "varchar", length: 200 })
  wallet_id: string;

  @Column({
    type: "decimal",
    precision: 18,
    scale: 2
  })
  amount: number;

  @Column({ type: "varchar", length: 10, default: null })
  currency: string;

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
    this.wallet_transaction_id = `${uuid}`;
  }
}
