import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  index() {
    return this.authService.routes();
  }

  @Post('signup')
  signup() {
    return 'signup';
  }

  @Post('signin')
  signin() {
    return 'signin';
  }
}
