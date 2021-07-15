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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const uuid_1 = require("uuid");
let UserEntity = class UserEntity {
    generateId() {
        const uuid = uuid_1.v4().replace(/-/g, "");
        this.user_id = `${uuid}`;
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200, default: null, unique: true }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 512, default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200, default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200, default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 200, default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "country", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 10, default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "currency", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updated_at", void 0);
__decorate([
    class_validator_1.IsJWT(),
    typeorm_1.Column({ type: "varchar", length: 512, default: null }),
    __metadata("design:type", String)
], UserEntity.prototype, "auth_token", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntity.prototype, "generateId", null);
UserEntity = __decorate([
    typeorm_1.Entity("user")
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map