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
import { PortfolioService } from './portfolio.service';

@Controller('api/portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post('add')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  addPost(
    @Body('title') title: string,
    @Body('projectUrl') projectUrl: string,
    @Body('coverUrl') coverUrl: string,
    @Body('clicksNumber') clicksNumber: number,
  ) {
    return this.portfolioService.addPortfolioItem({
      title,
      projectUrl,
      coverUrl,
      clicksNumber,
    });
  }

  @Get()
  getPortfolioItems() {
    return this.portfolioService.getPortfolioItems();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  getPortfolioItem(@Param('id') id: string) {
    return this.portfolioService.getPortfolioItem(id);
  }

  @Patch()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  editPortfolioItem(
    @Body('data')
    data: {
      id: number;
      title: string;
      projectUrl: string;
      coverUrl: string;
    },
  ) {
    return this.portfolioService.editPortfolioItem(data);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  deletePortfolioItem(@Param('id') id: number) {
    return this.portfolioService.deletePortfolioItem(id);
  }
}
