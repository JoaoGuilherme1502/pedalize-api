import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { BikeStatus } from '@prisma/client';

@Injectable()
export class BikeService {
    constructor(private prisma: PrismaService) {}

    async create(createBikeDto: CreateBikeDto) {
        return this.prisma.bike.create({
            data: {
                ...createBikeDto,
                status: BikeStatus.AVAILABLE,
            },
        });
    }

    async findAll() {
        return this.prisma.bike.findMany();
    }

    async findOne(id: string) {
        const bike = await this.prisma.bike.findUnique({
            where: { id },
        });
    
        if (!bike) {
            throw new NotFoundException('Bike não encontrada');
        }

        return bike;
    }
}
