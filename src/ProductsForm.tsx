import { useState } from "react";
import { Brand } from "./api/brands";
import { ProductInput } from "./api/products";

interface ProductsFormProps {
  onProductCreate: (values: ProductInput) => void;
  onBrandCreate: () => Promise<Brand>;
  brands: Brand[];
}

export default function ProductsForm({
  onBrandCreate,
  onProductCreate,
  brands,
}: ProductsFormProps) {
  const [selectedBrandId, setSelectedBrandId] = useState<number | undefined>(
    undefined
  );
  const [productName, setProductName] = useState<string>("");

  const [errors, setErrors] = useState<{
    selectedBrand?: string;
    product?: string;
  }>({});

  const handleBrandChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "add-brand") {
      try {
        const brand = await onBrandCreate();
        setSelectedBrandId(brand.id);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedBrandId(parseInt(e.target.value));
    }

    setErrors((prev) => ({ ...prev, selectedBrand: undefined }));
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
    setErrors((prev) => ({ ...prev, product: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedBrandId) {
      setErrors((prev) => ({ ...prev, selectedBrand: "Brand is required" }));
    }

    if (!productName) {
      setErrors((prev) => ({ ...prev, product: "Product is required" }));
    }

    // I wanted to show both the errors simultaneously. Hence, I am returning here
    if (!selectedBrandId || !productName) {
      return;
    }

    onProductCreate({ name: productName, brandId: selectedBrandId });

    setSelectedBrandId(undefined);
    setProductName("");
  };
  return (
    <form
      className="flex flex-col gap-4 items-start mt-8"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-8 w-full">
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-lg">Brand</label>
          <select
            placeholder="Select Brand"
            className="px-4 py-3 rounded-md border border-black bg-white"
            value={selectedBrandId || ""}
            onChange={handleBrandChange}
          >
            <option value={""}>Select Brand</option>
            {brands.map((brand) => {
              return (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              );
            })}
            <option className="text-blue-500 font-bold" value={"add-brand"}>
              Add Brand
            </option>
          </select>
          {errors.selectedBrand && (
            <p className="text-red-500">{errors.selectedBrand}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-1/2">
          <label className="text-lg">Product</label>
          <input
            placeholder="Enter Product Name"
            className="px-4 py-2 rounded-md border-black border"
            value={productName}
            onChange={handleProductChange}
          />
          {errors.product && <p className="text-red-500">{errors.product}</p>}
        </div>
      </div>
      <button className="w-full px-4 py-2 rounded-md border-black border mt-4 bg-black text-white">
        Add
      </button>
    </form>
  );
}
