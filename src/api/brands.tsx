import axios from "axios";

export interface Brand {
  id: number;
  name: string;
}

const brandApi = axios.create({
  baseURL: "http://localhost:3000/brands",
});

export const fetchAllBrands = async (): Promise<Brand[]> => {
  const { data } = await brandApi.get<Brand[]>("/");
  return data;
};

export const addBrand = async (name: string): Promise<Brand> => {
  const { data } = await brandApi.post<Brand>("/", { name });
  return data;
};

export const deleteBrand = async (brandId: number): Promise<void> => {
  await brandApi.delete(`/${brandId}`);
};
