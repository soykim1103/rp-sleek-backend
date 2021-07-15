export declare class UserEntity {
    user_id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    country: string;
    currency: string;
    created_at: Date;
    updated_at: Date;
    auth_token: string;
    generateId(): void;
}
