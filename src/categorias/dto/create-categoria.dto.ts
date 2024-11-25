import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Indica si una categoria esta disponible para renderizarse',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty()
  @IsOptional()
  productos?: Producto[];
}

export interface Producto {
  descripcion: string;
  disponible: boolean;
  nombre: string;
  urlImagen: string;
  valor: number;
  valorOferta: number;
}
