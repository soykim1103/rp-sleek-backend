import { Injectable } from "@nestjs/common";
import { CreateWalletTransactionDto } from "./dto/create-wallet-transaction.dto";
import { WalletTransactionEntity } from "./entities/wallet-transaction.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class WalletTransactionService {
  // constructor(
  //   @InjectRepository(WalletTransactionEntity)
  //   private readonly walletTransactionRepository: Repository<WalletTransactionEntity>
  // ) {}

  async create(createWalletTransactionDto: CreateWalletTransactionDto) {
    // const new_wallet_txn = new WalletTransactionEntity();
    // new_wallet_txn.user_id = createWalletTransactionDto.user_id;
    // new_wallet_txn.wallet_id = createWalletTransactionDto.wallet_id;
    // new_wallet_txn.amount = createWalletTransactionDto.amount;
    // new_wallet_txn.currency = createWalletTransactionDto.currency;

    // return await this.walletTransactionRepository.save(new_wallet_txn);
    return;
  }

  findAll() {
    return `This action returns all walletTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} walletTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} walletTransaction`;
  }
}
