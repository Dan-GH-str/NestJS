import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { ParseIntPipe } from 'src/conceptions/parseInt.pipe';
import { AuthGuard } from 'src/conceptions/auth.guard';
import { LoggingInterceptor } from 'src/conceptions/logging.interceptor';
import { CreateFlowerDto } from './flowewrs.dto';
import { ConfigService } from '@nestjs/config';
import { EnumAppMode } from 'src/globalTypes/glonalTypes';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('flowers')
@UseInterceptors(LoggingInterceptor)
export class FlowersController {
  constructor(
    private readonly flowersService: FlowersService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, type: [CreateFlowerDto], description: 'Return array of flowers' })
  getFlowers(@Query('pageNumber', ParseIntPipe) pageNumber: number) {
    console.log(this.configService.get<EnumAppMode>('MODE')) // Пример работы с файлом .env
    
    return this.flowersService.getFlowers();
  }

  @Post()
  @UsePipes(new ValidationPipe)
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201 })
  @ApiBody({ type: CreateFlowerDto, description: 'JSON structure for flower object' })
  createFlower(@Body() dto: CreateFlowerDto) {
    return this.flowersService.createFlower(dto)
  }
}
