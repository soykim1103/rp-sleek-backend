"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
const bcrypt_1 = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const wallet_service_1 = require("../wallet/wallet.service");
const create_wallet_dto_1 = require("../wallet/dto/create-wallet.dto");
let UserService = class UserService {
    constructor(userRepository, config, walletService) {
        this.userRepository = userRepository;
        this.config = config;
        this.walletService = walletService;
    }
    async createUser(registerNewuserDto) {
        let user = new user_entity_1.UserEntity();
        user.first_name = registerNewuserDto.firstname;
        user.last_name = registerNewuserDto.lastname;
        user.currency = registerNewuserDto.currency;
        user.country = registerNewuserDto.country;
        user.email = registerNewuserDto.email;
        user.password = await bcrypt_1.hash(registerNewuserDto.password, await bcrypt_1.genSalt());
        if (await this.userRepository.findOne({ email: user.email })) {
            const errors = { user: " already exists" };
            throw new http_exception_1.HttpException({ errors }, common_1.HttpStatus.CONFLICT);
        }
        await _.omit(await this.userRepository.save(user), ["password"]);
        const new_user = await this.userRepository.findOne({ email: user.email });
        const new_wallet = {
            user_id: new_user.user_id,
            balance: 0,
            currency: new_user.currency
        };
        await this.walletService.create(new_wallet);
        return _.omit(await this.userRepository.save(user), ["password"]);
    }
    async loginUser(loginuserDto) {
        let user = await this.userRepository.findOne({
            email: loginuserDto.email
        });
        if (!user) {
            const errors = { user: " not found" };
            throw new http_exception_1.HttpException({ errors }, common_1.HttpStatus.NOT_FOUND);
        }
        const isMatch = await bcrypt_1.compare(loginuserDto.password, user.password);
        if (!isMatch) {
            const errors = { Password: "incorrect" };
            throw new http_exception_1.HttpException({ errors }, common_1.HttpStatus.BAD_REQUEST);
        }
        const token = await jwt.sign({ id: user.user_id, email: user.email }, this.config.get("JWT_SECRET_KEY"), {
            expiresIn: "30d"
        });
        await this.userRepository.update(user.user_id, {
            auth_token: token
        });
        user.auth_token = token;
        return { token, user: _.omit(user, ["auth_token", "password"]) };
    }
    async findEmails() {
        return await this.userRepository.find({ select: ["email"] });
    }
    async findUser(user_id) {
        return _.omit(await this.userRepository.findOne(user_id), [
            "password",
            "auth_token"
        ]);
    }
    async findById(user_id) {
        const user = await this.userRepository.findOne(user_id);
        if (!user) {
            const errors = { user: " not found" };
            throw new http_exception_1.HttpException({ errors }, common_1.HttpStatus.NOT_FOUND);
        }
        return this.buildUserRO(user);
    }
    async getAllUsersEmails() {
        return await this.userRepository.find({ select: ["email"] });
    }
    async findByToken(auth_token) {
        let user;
        user = await this.userRepository.findOne({
            auth_token: auth_token
        });
        if (!user) {
            throw new http_exception_1.HttpException("Not authorized.", common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.buildUserRO(user);
    }
    buildUserRO(user) {
        const userRO = Object.assign({}, user);
        return { user: userRO };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        wallet_service_1.WalletService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map