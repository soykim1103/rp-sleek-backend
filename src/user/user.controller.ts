import { Controller, Get, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.decorator";
import { RegisterNewUserDto } from "./dto/register-new-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async registerUser(@Body() registerNewUserDto: RegisterNewUserDto) {
    return this.userService.createUser(registerNewUserDto);
  }

  @Post("login")
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Get("/")
  async getUser(
    @User("user_id")
    user_id: string
  ) {
    return await this.userService.findUser(user_id);
  }

  @Get("/allEmails")
  async getAllUsersEmails() {
    return await this.userService.getAllUsersEmails();
  }
}
