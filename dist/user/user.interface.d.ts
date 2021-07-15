export interface UserData {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    country: string;
    currency: string;
    created_at: Date;
    updated_at: Date;
    auth_token: string;
}
export interface UserRO {
    user: Omit<UserData, "password">;
}
