import { WalletTransactionService } from "./wallet-transaction.service";
import { CreateWalletTransactionDto } from "./dto/create-wallet-transaction.dto";
export declare class WalletTransactionController {
    private readonly walletTransactionService;
    constructor(walletTransactionService: WalletTransactionService);
    create(createWalletTransactionDto: CreateWalletTransactionDto): Promise<void>;
    findAll(): string;
    findOne(id: string): string;
}
