import { WalletService } from "./wallet.service";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { TopupWalletDto } from "./dto/wallet-topup.dto";
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    create(createWalletDto: CreateWalletDto): Promise<import("./entities/wallet.entity").WalletEntity>;
    findOne(user_id: string): Promise<import("./entities/wallet.entity").WalletEntity>;
    topup(topupWalletDto: TopupWalletDto): Promise<void>;
}
