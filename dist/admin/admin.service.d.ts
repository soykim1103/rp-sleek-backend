import { Repository } from "typeorm";
import { AdminEntity } from "./entities/admin.entity";
import { AdminRO } from "./admin.interface";
import { RegisterNewAdminDto } from "./dto/register-new-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import * as _ from "lodash";
import { ConfigService } from "@nestjs/config";
export declare class AdminService {
    private readonly adminRepository;
    private readonly config;
    constructor(adminRepository: Repository<AdminEntity>, config: ConfigService);
    createUser(registerNewAdminDto: RegisterNewAdminDto): Promise<_.Omit<AdminEntity, "password">>;
    loginUser(loginAdminDto: LoginAdminDto): Promise<{
        token: any;
        admin: _.Omit<AdminEntity, "password" | "auth_token">;
    }>;
    findEmails(): Promise<AdminEntity[]>;
    findUser(admin_id: string): Promise<_.Omit<AdminEntity, "password" | "auth_token">>;
    findById(admin_id: string): Promise<AdminRO>;
    findByToken(auth_token: string): Promise<AdminRO>;
    private buildAdminRO;
}
