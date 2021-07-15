import { Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserRO } from "./user.interface";
import { HttpException } from "@nestjs/common/exceptions/http.exception";
import { RegisterNewUserDto } from "./dto/register-new-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { compare, genSalt, hash } from "bcrypt";
import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { WalletService } from "src/wallet/wallet.service";
import { CreateWalletDto } from "src/wallet/dto/create-wallet.dto";
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly config: ConfigService,
    private readonly walletService: WalletService
  ) {}

  async createUser(registerNewuserDto: RegisterNewUserDto) {
    let user = new UserEntity();
    user.first_name = registerNewuserDto.firstname;
    user.last_name = registerNewuserDto.lastname;
    user.currency = registerNewuserDto.currency;
    user.country = registerNewuserDto.country;
    user.email = registerNewuserDto.email;
    user.password = await hash(registerNewuserDto.password, await genSalt());
    if (await this.userRepository.findOne({ email: user.email })) {
      const errors = { user: " already exists" };
      throw new HttpException({ errors }, HttpStatus.CONFLICT);
    }

    await _.omit(await this.userRepository.save(user), ["password"]);

    const new_user = await this.userRepository.findOne({ email: user.email });

    const new_wallet: CreateWalletDto = {
      user_id: new_user.user_id,
      balance: 0,
      currency: new_user.currency
    };

    await this.walletService.create(new_wallet);
    // const result=
    return _.omit(await this.userRepository.save(user), ["password"]);
  }

  async loginUser(loginuserDto: LoginUserDto) {
    let user = await this.userRepository.findOne({
      email: loginuserDto.email
    });
    if (!user) {
      const errors = { user: " not found" };
      throw new HttpException({ errors }, HttpStatus.NOT_FOUND);
    }

    const isMatch = await compare(loginuserDto.password, user.password);
    if (!isMatch) {
      const errors = { Password: "incorrect" };
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    const token = await jwt.sign(
      { id: user.user_id, email: user.email },
      this.config.get("JWT_SECRET_KEY"),
      {
        expiresIn: "30d"
      }
    );

    await this.userRepository.update(user.user_id, {
      auth_token: token
    });
    user.auth_token = token;
    return { token, user: _.omit(user, ["auth_token", "password"]) };
  }

  async findEmails() {
    return await this.userRepository.find({ select: ["email"] });
  }

  async findUser(user_id: string) {
    return _.omit(await this.userRepository.findOne(user_id), [
      "password",
      "auth_token"
    ]);
  }

  async findById(user_id: string): Promise<UserRO> {
    const user = await this.userRepository.findOne(user_id);
    if (!user) {
      const errors = { user: " not found" };
      throw new HttpException({ errors }, HttpStatus.NOT_FOUND);
    }
    return this.buildUserRO(user);
  }

  async getAllUsersEmails() {
    return await this.userRepository.find({ select: ["email"] });
  }

  async findByToken(auth_token: string): Promise<UserRO> {
    let user;

    user = await this.userRepository.findOne({
      auth_token: auth_token
    });

    if (!user) {
      throw new HttpException("Not authorized.", HttpStatus.UNAUTHORIZED);
    }

    return this.buildUserRO(user);
  }

  private buildUserRO(user: UserEntity): UserRO {
    const userRO = { ...user };

    return { user: userRO };
  }
}
