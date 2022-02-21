import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guart';
import { Roles } from '../auth/guards/roles.decorator';

@Controller('api/photos')
export class PhotosController {
  @Post('upload')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `alexmatei-image-${file.originalname}`);
        },
      }),
    }),
  )
  uploadPhoto(@UploadedFile() file: any) {
    if (file) {
      return {
        image: `https://alexmatei.tech/api/photos/alexmatei-image-${file.originalname}`,
      };
    } else {
      throw new BadRequestException('upload err');
    }
  }

  @Get('/:id')
  getPhoto(@Param('id') fileId: string, @Res() res) {
    const exists = fs.existsSync(`./uploads/${fileId}`);
    if (!exists) {
      throw new BadRequestException('file doesnt exists');
    }
    res.sendFile(fileId, { root: 'uploads' });
  }
}
