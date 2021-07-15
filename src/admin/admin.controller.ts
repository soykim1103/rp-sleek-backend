import { Controller, Get, Post, Body } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Admin } from "./admin.decorator";
import { RegisterNewAdminDto } from "./dto/register-new-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("register")
  async registerUser(@Body() registerNewAdminDto: RegisterNewAdminDto) {
    return this.adminService.createUser(registerNewAdminDto);
  }

  @Post("login")
  async loginUser(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminService.loginUser(loginAdminDto);
  }

  @Get("/")
  async getUser(
    @Admin("admin_id")
    admin_id: string
  ) {
    return await this.adminService.findUser(admin_id);
  }
}
