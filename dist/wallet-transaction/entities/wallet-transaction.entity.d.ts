export declare class WalletTransactionEntity {
    wallet_transaction_id: string;
    user_id: string;
    wallet_id: string;
    amount: number;
    currency: string;
    created_at: Date;
    updated_at: Date;
    generateId(): void;
}
