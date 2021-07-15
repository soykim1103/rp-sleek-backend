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
exports.WalletEntity = void 0;
const typeorm_1 = require("typeorm");
let WalletEntity = class WalletEntity {
};
__decorate([
    typeorm_1.PrimaryColumn({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], WalletEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], WalletEntity.prototype, "wallet_id", void 0);
__decorate([
    typeorm_1.Column({
        type: "decimal",
        precision: 18,
        scale: 2
    }),
    __metadata("design:type", Number)
], WalletEntity.prototype, "balance", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 10, default: null }),
    __metadata("design:type", String)
], WalletEntity.prototype, "currency", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], WalletEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Date)
], WalletEntity.prototype, "updated_at", void 0);
WalletEntity = __decorate([
    typeorm_1.Entity("wallet")
], WalletEntity);
exports.WalletEntity = WalletEntity;
//# sourceMappingURL=wallet.entity.js.map