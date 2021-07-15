import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import { IsJWT } from "class-validator";

@Entity("wallet")
export class WalletEntity {
  @PrimaryColumn({ type: "varchar", length: 200 })
  user_id: string;

  @Column({ type: "varchar", length: 200 })
  wallet_id: string;

  @Column({
    type: "decimal",
    precision: 18,
    scale: 2
  })
  balance: number;

  @Column({ type: "varchar", length: 10, default: null })
  currency: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updated_at: Date;
}
