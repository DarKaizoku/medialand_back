import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, isNotEmpty } from "class-validator";

export class UpdateUserStatus {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    admin: boolean;
}