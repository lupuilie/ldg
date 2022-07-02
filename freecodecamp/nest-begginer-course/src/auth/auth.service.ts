import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  routes() {
    return {
      login: `http://login`,
      signup: `http://signup`,
    };
  }
  login() {
    return 'login';
  }
  signup() {
    return 'signup';
  }
}
