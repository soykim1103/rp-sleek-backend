"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWalletTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_wallet_transaction_dto_1 = require("./create-wallet-transaction.dto");
class UpdateWalletTransactionDto extends swagger_1.PartialType(create_wallet_transaction_dto_1.CreateWalletTransactionDto) {
}
exports.UpdateWalletTransactionDto = UpdateWalletTransactionDto;
//# sourceMappingURL=update-wallet-transaction.dto.js.map