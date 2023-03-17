import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local.auth.guard';
import { LoginDto } from './auth/login.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiTags('Login')
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
