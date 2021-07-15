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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTransactionController = void 0;
const common_1 = require("@nestjs/common");
const wallet_transaction_service_1 = require("./wallet-transaction.service");
const create_wallet_transaction_dto_1 = require("./dto/create-wallet-transaction.dto");
let WalletTransactionController = class WalletTransactionController {
    constructor(walletTransactionService) {
        this.walletTransactionService = walletTransactionService;
    }
    create(createWalletTransactionDto) {
        return this.walletTransactionService.create(createWalletTransactionDto);
    }
    findAll() {
        return this.walletTransactionService.findAll();
    }
    findOne(id) {
        return this.walletTransactionService.findOne(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_transaction_dto_1.CreateWalletTransactionDto]),
    __metadata("design:returntype", void 0)
], WalletTransactionController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WalletTransactionController.prototype, "findAll", null);
__decorate([
    common_1.Get(":id"),
    __param(0, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WalletTransactionController.prototype, "findOne", null);
WalletTransactionController = __decorate([
    common_1.Controller("wallet-transaction"),
    __metadata("design:paramtypes", [wallet_transaction_service_1.WalletTransactionService])
], WalletTransactionController);
exports.WalletTransactionController = WalletTransactionController;
//# sourceMappingURL=wallet-transaction.controller.js.map