import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [AuthModule, UsersModule, ProductsModule],
  providers: [PrismaService],
})
export class AppModule {}
