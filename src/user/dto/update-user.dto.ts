import { PartialType } from "@nestjs/swagger";
import { CreateBikeDto } from "src/bike/dto/create-bike.dto";

export class UpdateBikeDto extends PartialType(CreateBikeDto) {}