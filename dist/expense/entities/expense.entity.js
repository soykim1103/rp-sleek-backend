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
exports.ExpenseEntity = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let ExpenseEntity = class ExpenseEntity extends typeorm_1.BaseEntity {
    generateId() {
        const uuid = uuid_1.v4().replace(/-/g, "");
        this.expense_id = `${uuid}`;
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "expense_id", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "admin_id", void 0);
__decorate([
    typeorm_1.Column({ type: Number, default: null }),
    __metadata("design:type", Number)
], ExpenseEntity.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 5, default: null }),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "currency", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 100, default: null }),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "userid", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], ExpenseEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Date)
], ExpenseEntity.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExpenseEntity.prototype, "generateId", null);
ExpenseEntity = __decorate([
    typeorm_1.Entity("expense")
], ExpenseEntity);
exports.ExpenseEntity = ExpenseEntity;
//# sourceMappingURL=expense.entity.js.map