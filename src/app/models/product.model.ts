export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

export interface createProductDTO extends Omit<Product, "id" | "category"> {
  categoryId: number;
}

//PARTIAL: colaca el signo de pregunta en todos los atributos, asi hara
// que los atributos puedan ser opcionales

export interface updateProductDTO extends Partial<createProductDTO>{
}
