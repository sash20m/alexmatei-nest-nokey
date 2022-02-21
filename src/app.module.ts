import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './api/books/books.module';
import { EmailModule } from './api/email/email.module';
import { PhotosModule } from './api/photos/photos.module';
import { PortfolioModule } from './api/portfolio/portfolio.module';
import { PostsModule } from './api/posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { LoggerModule } from './api/logger/logger.module';

@Module({
  imports: [
    PostsModule,
    PhotosModule,
    PortfolioModule,
    BooksModule,
    EmailModule,
    UserModule,
    AuthModule,
    LoggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'sasha',
      password: 'root',
      database: 'alexmatei',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
