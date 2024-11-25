import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // Esquema para Producto
export class Producto {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  disponible: boolean;

  @Prop({ required: true })
  urlImagen: string;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  valorOferta: number;
}

@Schema() // Esquema para Categoría
export class Categoria {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: false })
  disponible: boolean;

  @Prop({ type: [Producto], default: [] }) // Subdocumentos definidos directamente
  productos: Producto[];
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
export type CategoriaDocument = Categoria & Document;
