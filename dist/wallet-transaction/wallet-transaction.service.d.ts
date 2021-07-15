import { CreateWalletTransactionDto } from "./dto/create-wallet-transaction.dto";
export declare class WalletTransactionService {
    create(createWalletTransactionDto: CreateWalletTransactionDto): Promise<void>;
    findAll(): string;
    findOne(id: number): string;
    remove(id: number): string;
}
