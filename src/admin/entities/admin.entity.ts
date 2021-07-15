import { Entity, Column, PrimaryColumn, BeforeInsert } from "typeorm";
import { IsEmail, IsJWT } from "class-validator";
import { v4 as uuidv4 } from "uuid";

@Entity("admin")
export class AdminEntity {
  @PrimaryColumn({ type: "varchar", length: 200 })
  admin_id: string;

  @Column({ type: "varchar", length: 200, default: null, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "varchar", length: 512, default: null })
  password: string;

  @Column({ type: "varchar", length: 200, default: null })
  first_name: string;

  @Column({ type: "varchar", length: 200, default: null })
  last_name: string;

  @Column({ type: "varchar", length: 200, default: null })
  country: string;

  @Column({ type: "varchar", length: 10, default: null })
  currency: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column("timestamp", {
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP"
  })
  updated_at: Date;

  @IsJWT()
  @Column({ type: "varchar", length: 512, default: null })
  auth_token: string;

  @BeforeInsert()
  generateId() {
    const uuid = uuidv4().replace(/-/g, "");
    this.admin_id = `${uuid}`;
  }
}
