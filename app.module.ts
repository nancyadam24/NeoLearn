import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '3600s' },
    }),
    UserModule,
    CourseModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
