"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTransactionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_transaction_entity_1 = require("./entities/wallet-transaction.entity");
const wallet_transaction_service_1 = require("./wallet-transaction.service");
const wallet_transaction_controller_1 = require("./wallet-transaction.controller");
let WalletTransactionModule = class WalletTransactionModule {
};
WalletTransactionModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([wallet_transaction_entity_1.WalletTransactionEntity])],
        providers: [wallet_transaction_service_1.WalletTransactionService],
        controllers: [wallet_transaction_controller_1.WalletTransactionController],
        exports: [wallet_transaction_service_1.WalletTransactionService]
    })
], WalletTransactionModule);
exports.WalletTransactionModule = WalletTransactionModule;
//# sourceMappingURL=wallet-transaction.module.js.map