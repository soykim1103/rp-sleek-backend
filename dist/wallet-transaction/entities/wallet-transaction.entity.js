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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTransactionEntity = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let WalletTransactionEntity = class WalletTransactionEntity {
    generateId() {
        const uuid = uuid_1.v4().replace(/-/g, "");
        this.wallet_transaction_id = `${uuid}`;
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], WalletTransactionEntity.prototype, "wallet_transaction_id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], WalletTransactionEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], WalletTransactionEntity.prototype, "wallet_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal",
        precision: 18,
        scale: 2
    }),
    __metadata("design:type", Number)
], WalletTransactionEntity.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 10, default: null }),
    __metadata("design:type", String)
], WalletTransactionEntity.prototype, "currency", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], WalletTransactionEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Date)
], WalletTransactionEntity.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WalletTransactionEntity.prototype, "generateId", null);
WalletTransactionEntity = __decorate([
    typeorm_1.Entity("wallet_transaction")
], WalletTransactionEntity);
exports.WalletTransactionEntity = WalletTransactionEntity;
//# sourceMappingURL=wallet-transaction.entity.js.map