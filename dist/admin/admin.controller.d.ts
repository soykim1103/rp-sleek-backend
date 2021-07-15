/// <reference types="lodash" />
import { AdminService } from "./admin.service";
import { RegisterNewAdminDto } from "./dto/register-new-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    registerUser(registerNewAdminDto: RegisterNewAdminDto): Promise<import("lodash").Omit<import("./entities/admin.entity").AdminEntity, "password">>;
    loginUser(loginAdminDto: LoginAdminDto): Promise<{
        token: any;
        admin: import("lodash").Omit<import("./entities/admin.entity").AdminEntity, "password" | "auth_token">;
    }>;
    getUser(admin_id: string): Promise<import("lodash").Omit<import("./entities/admin.entity").AdminEntity, "password" | "auth_token">>;
}
