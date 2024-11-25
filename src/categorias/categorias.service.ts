import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria, CategoriaDocument } from '../schemas/categorias.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name)
    private readonly categoryModel: Model<CategoriaDocument>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      await this.categoryModel.create(createCategoriaDto);
      return `Categoria: ${createCategoriaDto.nombre} con id: ${createCategoriaDto.id} creada exitosamente!`;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(
        'Ocurrió un error al intentar crear la categoría',
      );
    }
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoryModel.find().exec();
  }

  async findOne(id: number): Promise<Categoria> {
    const category = await this.categoryModel.findOne({ id }).exec(); // Buscar por el campo "id"
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const resultado = await this.categoryModel
      .updateOne({ id }, { $set: updateCategoriaDto })
      .exec();

    if (resultado.modifiedCount === 0) {
      throw new BadRequestException(
        `No se realizaron cambios en la categoría con Id: ${id}.`,
      );
    }
    return `Categoria Id: ${id} actualizada correctamente!`;
  }

  async remove(id: number) {
    try {
      const response = await this.categoryModel.deleteOne({ id }).exec();
      if (response.deletedCount > 0) {
        return `Categoría Id: ${id} eliminada correctamente`;
      } else {
        throw new NotFoundException(
          `No se encontró una Categoría con Id: ${id} para eliminar`,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(
        `Ocurrió un error al intentar eliminar la Categoría Id: ${id}`,
      );
    }
  }
}
