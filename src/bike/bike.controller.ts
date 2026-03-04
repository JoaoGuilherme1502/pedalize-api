import { Body, Controller, Get, Param, Post, Patch, ParseUUIDPipe} from '@nestjs/common';
import { BikeService } from './bike.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

@Controller('bikes')
export class BikeController {
    constructor(private readonly bikeService: BikeService) {}

    @Post()
    create(@Body() createBikeDto: CreateBikeDto) {
        return this.bikeService.create(createBikeDto);
    }

    @Patch(':id')
    update(@Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBikeDto: UpdateBikeDto
    ) {
        return this.bikeService.update(id, updateBikeDto)
    }

    @Get()
    async findAll() {
        return this.bikeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.bikeService.findOne(id);
    }
}
