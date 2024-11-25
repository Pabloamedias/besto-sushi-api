export class Categoria {
  disponible: boolean;
  id: number;
  nombre: string;
  productos: Producto[];
}

export interface Producto {
  descripcion: string;
  disponible: boolean;
  nombre: string;
  urlImagen: string;
  valor: number;
  valorOferta: number;
}
