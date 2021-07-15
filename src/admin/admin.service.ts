import { Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminEntity } from "./entities/admin.entity";
import { AdminRO } from "./admin.interface";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { RegisterNewAdminDto } from "./dto/register-new-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";
import { compare, genSalt, hash } from "bcrypt";
import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly config: ConfigService
  ) {}

  async createUser(registerNewAdminDto: RegisterNewAdminDto) {
    let admin = new AdminEntity();
    admin.first_name = registerNewAdminDto.firstname;
    admin.last_name = registerNewAdminDto.lastname;
    admin.currency = registerNewAdminDto.currency;
    admin.country = registerNewAdminDto.country;
    admin.email = registerNewAdminDto.email;
    admin.password = await hash(registerNewAdminDto.password, await genSalt());
    if (await this.adminRepository.findOne({ email: admin.email })) {
      const errors = { Admin: " already exists" };
      throw new HttpException({ errors }, HttpStatus.CONFLICT);
    }
    // const result=
    return _.omit(await this.adminRepository.save(admin), ["password"]);
  }

  async loginUser(loginAdminDto: LoginAdminDto) {
    let admin = await this.adminRepository.findOne({
      email: loginAdminDto.email
    });
    if (!admin) {
      const errors = { Admin: " not found" };
      throw new HttpException({ errors }, HttpStatus.NOT_FOUND);
    }

    const isMatch = await compare(loginAdminDto.password, admin.password);
    if (!isMatch) {
      const errors = { Password: "incorrect" };
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    const token = await jwt.sign(
      { id: admin.admin_id, email: admin.email },
      this.config.get("JWT_SECRET_KEY"),
      {
        expiresIn: "30d"
      }
    );

    await this.adminRepository.update(admin.admin_id, {
      auth_token: token
    });
    admin.auth_token = token;
    return { token, admin: _.omit(admin, ["auth_token", "password"]) };
  }

  async findEmails() {
    return await this.adminRepository.find({ select: ["email"] });
  }

  async findUser(admin_id: string) {
    return _.omit(await this.adminRepository.findOne(admin_id), [
      "password",
      "auth_token"
    ]);
  }

  async findById(admin_id: string): Promise<AdminRO> {
    const admin = await this.adminRepository.findOne(admin_id);
    if (!admin) {
      const errors = { Admin: " not found" };
      throw new HttpException({ errors }, HttpStatus.NOT_FOUND);
    }
    return this.buildAdminRO(admin);
  }

  async findByToken(auth_token: string): Promise<AdminRO> {
    let admin;

    admin = await this.adminRepository.findOne({
      auth_token: auth_token
    });

    if (!admin) {
      throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
    }

    return this.buildAdminRO(admin);
  }

  private buildAdminRO(admin: AdminEntity): AdminRO {
    const acountRO = { ...admin };

    return { admin: acountRO };
  }
}
