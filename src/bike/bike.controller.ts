import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BikeService } from './bike.service';
import { CreateBikeDto } from './dto/create-bike.dto';

@Controller('bikes')
export class BikeController {
    constructor(private readonly bikeService: BikeService) {}

    @Post()
    create(@Body() createBikeDto: CreateBikeDto) {
        return this.bikeService.create(createBikeDto);
    }

    @Get()
    async findAll() {
        return this.bikeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bikeService.findOne(id);
    }
}
