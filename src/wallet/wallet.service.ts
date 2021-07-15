import { Injectable } from "@nestjs/common";
import { CreateWalletDto } from "./dto/create-wallet.dto";
import { UpdateWalletDto } from "./dto/update-wallet.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { WalletEntity } from "./entities/wallet.entity";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { TopupWalletDto } from "./dto/wallet-topup.dto";
import { CreateWalletTransactionDto } from "src/wallet-transaction/dto/create-wallet-transaction.dto";
import { WalletTransactionService } from "src/wallet-transaction/wallet-transaction.service";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    private readonly walletTransactionService: WalletTransactionService
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    const uuid = uuidv4().replace(/-/g, "");

    const new_wallet = new WalletEntity();
    new_wallet.user_id = createWalletDto.user_id;
    new_wallet.balance = createWalletDto.balance;
    new_wallet.currency = createWalletDto.currency;
    new_wallet.wallet_id = `${uuid}`;

    return await this.walletRepository.save(new_wallet);
  }

  async findOne(user_id: string) {
    return await this.walletRepository.findOne({ user_id });
  }

  async topup(topupWalletDto: TopupWalletDto) {
    const { user_id, wallet_id, amount, currency } = topupWalletDto;

    let current_wallet = await this.walletRepository.findOne({ wallet_id });

    if (!current_wallet) {
      throw new Error("No wallet found for walletId: " + wallet_id);
    }

    const new_amount = +amount * 2.409;

    current_wallet.balance = +current_wallet.balance + +new_amount;

    await this.walletRepository.save(current_wallet);

    const new_wallet_txn: CreateWalletTransactionDto = {
      user_id,
      wallet_id,
      amount,
      currency
    };

    await this.walletTransactionService.create(new_wallet_txn);
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
