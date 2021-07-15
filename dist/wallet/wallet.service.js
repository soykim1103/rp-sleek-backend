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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_entity_1 = require("./entities/wallet.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const create_wallet_transaction_dto_1 = require("../wallet-transaction/dto/create-wallet-transaction.dto");
const wallet_transaction_service_1 = require("../wallet-transaction/wallet-transaction.service");
let WalletService = class WalletService {
    constructor(walletRepository, walletTransactionService) {
        this.walletRepository = walletRepository;
        this.walletTransactionService = walletTransactionService;
    }
    async create(createWalletDto) {
        const uuid = uuid_1.v4().replace(/-/g, "");
        const new_wallet = new wallet_entity_1.WalletEntity();
        new_wallet.user_id = createWalletDto.user_id;
        new_wallet.balance = createWalletDto.balance;
        new_wallet.currency = createWalletDto.currency;
        new_wallet.wallet_id = `${uuid}`;
        return await this.walletRepository.save(new_wallet);
    }
    async findOne(user_id) {
        return await this.walletRepository.findOne({ user_id });
    }
    async topup(topupWalletDto) {
        const { user_id, wallet_id, amount, currency } = topupWalletDto;
        let current_wallet = await this.walletRepository.findOne({ wallet_id });
        if (!current_wallet) {
            throw new Error("No wallet found for walletId: " + wallet_id);
        }
        const new_amount = +amount * 2.409;
        current_wallet.balance = +current_wallet.balance + +new_amount;
        await this.walletRepository.save(current_wallet);
        const new_wallet_txn = {
            user_id,
            wallet_id,
            amount,
            currency
        };
        await this.walletTransactionService.create(new_wallet_txn);
    }
    update(id, updateWalletDto) {
        return `This action updates a #${id} wallet`;
    }
    remove(id) {
        return `This action removes a #${id} wallet`;
    }
};
WalletService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(wallet_entity_1.WalletEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wallet_transaction_service_1.WalletTransactionService])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map