import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { BikeStatus } from '@prisma/client';
import { UpdateBikeDto } from './dto/update-bike.dto';

@Injectable()
export class BikeService {
    constructor(private prisma: PrismaService) {}

    private async ensureBikeExists(id: string) {
        const bike = await this.prisma.bike.findUnique({
            where: { id },
        });

        if (!bike) {
            throw new NotFoundException('Bike não encontrada');
        }

        return bike;
    }

    async create(createBikeDto: CreateBikeDto) {
        return this.prisma.bike.create({
            data: {
                ...createBikeDto,
                status: BikeStatus.AVAILABLE,
            },
        });
    }

    async update(id: string, data: UpdateBikeDto) {
        await this.ensureBikeExists(id)

        return this.prisma.bike.update({
            where: { id },
            data,
        })
    }

    async findAll() {
        return this.prisma.bike.findMany();
    }

    async findOne(id: string) {
        return this.ensureBikeExists(id);
    }

    async remove(id: string) {
        await this.ensureBikeExists(id);

        // A bike não é removida do banco de dados, só fica indisponível para o usuário
        return this.prisma.bike.update({
            where: { id },
            data: {status: BikeStatus.MAINTENANCE},
        });
    }
}
