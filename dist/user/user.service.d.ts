import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserRO } from "./user.interface";
import { RegisterNewUserDto } from "./dto/register-new-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import * as _ from "lodash";
import { ConfigService } from "@nestjs/config";
import { WalletService } from "src/wallet/wallet.service";
export declare class UserService {
    private readonly userRepository;
    private readonly config;
    private readonly walletService;
    constructor(userRepository: Repository<UserEntity>, config: ConfigService, walletService: WalletService);
    createUser(registerNewuserDto: RegisterNewUserDto): Promise<_.Omit<UserEntity, "password">>;
    loginUser(loginuserDto: LoginUserDto): Promise<{
        token: any;
        user: _.Omit<UserEntity, "password" | "auth_token">;
    }>;
    findEmails(): Promise<UserEntity[]>;
    findUser(user_id: string): Promise<_.Omit<UserEntity, "password" | "auth_token">>;
    findById(user_id: string): Promise<UserRO>;
    getAllUsersEmails(): Promise<UserEntity[]>;
    findByToken(auth_token: string): Promise<UserRO>;
    private buildUserRO;
}
