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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./entities/admin.entity");
const http_exception_1 = require("@nestjs/common/exceptions/http.exception");
const bcrypt_1 = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
let AdminService = class AdminService {
    constructor(adminRepository, config) {
        this.adminRepository = adminRepository;
        this.config = config;
    }
    async createUser(registerNewAdminDto) {
        let admin = new admin_entity_1.AdminEntity();
        admin.first_name = registerNewAdminDto.firstname;
        admin.last_name = registerNewAdminDto.lastname;
        admin.currency = registerNewAdminDto.currency;
        admin.country = registerNewAdminDto.country;
        admin.email = registerNewAdminDto.email;
        admin.password = await bcrypt_1.hash(registerNewAdminDto.password, await bcrypt_1.genSalt());
        if (await this.adminRepository.findOne({ email: admin.email })) {
            const errors = { Admin: " already exists" };
            throw new http_exception_1.HttpException({ errors }, common_1.HttpStatus.CONFLICT);
        }
        return _.omit(await this.adminRepository.save(admin), ["password"]);
    }
    async loginUser(loginAdminDto) {
        let admin = await this.adminRepository.findOne({
            email: loginAdminDto.email
        });
        if (!admin) {
            const errors = { Admin: " not found" };
            throw new http_exception_1.HttpException({ errors }, common_1.HttpStatus.NOT_FOUND);
        }
        const isMatch = await bcrypt_1.compare(loginAdminDto.password, admin.password);
        if (!isMatch) {
            const errors = { Password: "incorrect" };
            throw new http_exception_1.HttpException({ errors }, common_1.HttpStatus.BAD_REQUEST);
        }
        const token = await jwt.sign({ id: admin.admin_id, email: admin.email }, this.config.get("JWT_SECRET_KEY"), {
            expiresIn: "30d"
        });
        await this.adminRepository.update(admin.admin_id, {
            auth_token: token
        });
        admin.auth_token = token;
        return { token, admin: _.omit(admin, ["auth_token", "password"]) };
    }
    async findEmails() {
        return await this.adminRepository.find({ select: ["email"] });
    }
    async findUser(admin_id) {
        return _.omit(await this.adminRepository.findOne(admin_id), [
            "password",
            "auth_token"
        ]);
    }
    async findById(admin_id) {
        const admin = await this.adminRepository.findOne(admin_id);
        if (!admin) {
            const errors = { Admin: " not found" };
            throw new http_exception_1.HttpException({ errors }, common_1.HttpStatus.NOT_FOUND);
        }
        return this.buildAdminRO(admin);
    }
    async findByToken(auth_token) {
        let admin;
        admin = await this.adminRepository.findOne({
            auth_token: auth_token
        });
        if (!admin) {
            throw new http_exception_1.HttpException("Not authorized.", common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.buildAdminRO(admin);
    }
    buildAdminRO(admin) {
        const acountRO = Object.assign({}, admin);
        return { admin: acountRO };
    }
};
AdminService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(admin_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map