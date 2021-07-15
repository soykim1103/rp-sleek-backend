import { CreateWalletDto } from "./dto/create-wallet.dto";
import { UpdateWalletDto } from "./dto/update-wallet.dto";
import { WalletEntity } from "./entities/wallet.entity";
import { Repository } from "typeorm";
import { TopupWalletDto } from "./dto/wallet-topup.dto";
import { WalletTransactionService } from "src/wallet-transaction/wallet-transaction.service";
export declare class WalletService {
    private readonly walletRepository;
    private readonly walletTransactionService;
    constructor(walletRepository: Repository<WalletEntity>, walletTransactionService: WalletTransactionService);
    create(createWalletDto: CreateWalletDto): Promise<WalletEntity>;
    findOne(user_id: string): Promise<WalletEntity>;
    topup(topupWalletDto: TopupWalletDto): Promise<void>;
    update(id: number, updateWalletDto: UpdateWalletDto): string;
    remove(id: number): string;
}
