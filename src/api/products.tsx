import axios from "axios";

export interface Product {
  id: number;
  name: string;
  brandId: number;
}

export type ProductInput = Omit<Product, "id">;

const productApi = axios.create({
  baseURL: "http://localhost:3000/products",
});

export const fetchAllProducts = async (): Promise<Product[]> => {
  const { data } = await productApi.get<Product[]>("/");
  return data;
};

export const addProduct = async (product: ProductInput): Promise<Product> => {
  const { data } = await productApi.post<Product>("/", product);
  return data;
};

export const deleteProduct = async (productId: number): Promise<void> => {
  await productApi.delete(`/${productId}`);
};

export const updateProductName = async (productId: number, newName: string) => {
  await productApi.patch(`/${productId}`, { name: newName });
};
