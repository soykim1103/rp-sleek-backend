/// <reference types="lodash" />
import { UserService } from "./user.service";
import { RegisterNewUserDto } from "./dto/register-new-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(registerNewUserDto: RegisterNewUserDto): Promise<import("lodash").Omit<import("./entities/user.entity").UserEntity, "password">>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        token: any;
        user: import("lodash").Omit<import("./entities/user.entity").UserEntity, "password" | "auth_token">;
    }>;
    getUser(user_id: string): Promise<import("lodash").Omit<import("./entities/user.entity").UserEntity, "password" | "auth_token">>;
    getAllUsersEmails(): Promise<import("./entities/user.entity").UserEntity[]>;
}
