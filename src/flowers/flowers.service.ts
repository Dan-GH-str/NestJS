import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFlowerDto } from './flowewrs.dto';

@Injectable()
export class FlowersService {
    constructor(private prisma: PrismaService) {}

    getFlowers() {
        return this.prisma.flower.findMany()
    }

    createFlower(dto: CreateFlowerDto) {
        return this.prisma.flower.create({ data: dto })
    }
}
