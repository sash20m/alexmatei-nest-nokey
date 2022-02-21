import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/guards/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guart';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  addPost(
    @Body('title') title: string,
    @Body('text') text: string,
    @Body('coverUrl') coverUrl: string,
    @Body('isBookEssay') isBookEssay: boolean,
  ) {
    return this.postsService.addPost({ title, text, coverUrl, isBookEssay });
  }

  @Get('tweets/:id')
  getTweetsWithId(@Param('id') id: string) {
    return this.postsService.getTweets(id);
  }

  @Get('tweets')
  getTweets() {
    return this.postsService.getTweets();
  }

  @Get('twitter-user')
  getTwitterUser() {
    return this.postsService.getTwitterUser();
  }

  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Patch()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  editPost(
    @Body('data')
    data: {
      id: number;
      title?: string;
      text?: string;
      coverUrl?: string;
      isBookEssay?: boolean;
    },
  ) {
    return this.postsService.editPost(data);
  }

  @Post('like')
  likePost(@Body('id') id: number) {
    return this.postsService.likePost(id);
  }

  @Get(':id')
  getPost(@Param('id') id: number) {
    return this.postsService.getPost(id);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }
}
