import { useEffect, useState } from "react";
import { Brand, addBrand, deleteBrand, fetchAllBrands } from "./api/brands";
import {
  Product,
  fetchAllProducts,
  addProduct,
  ProductInput,
  deleteProduct,
  updateProductName,
} from "./api/products";
import ProductsTable from "./ProductsTable";
import ProductsForm from "./ProductsForm";

function App() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const brands = await fetchAllBrands();
      const products = await fetchAllProducts();
      setBrands(brands);
      setProducts(products);
    };

    fetchData().catch((err) => {
      alert(
        "Data fetching went wrong. Please look at the console for more information"
      );
      console.log(err);
    });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(brands, products);

  const onProductCreate = async (values: ProductInput) => {
    try {
      await addProduct(values);
      const products = await fetchAllProducts();
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };

  const onProductDelete = async (productId: number) => {
    await deleteProduct(productId);
    const products = await fetchAllProducts();
    setProducts(products);
  };

  const onProductEdit = async (productId: number) => {
    const updatedName = prompt("Enter the new Name for the brand");

    if (!updatedName) {
      return;
      // also can throw error or reinforce the user to enter the name again and again
    }

    await updateProductName(productId, updatedName);
    const products = await fetchAllProducts();
    setProducts(products);
  };

  const onBrandCreate = async (): Promise<Brand> => {
    const name = prompt("Enter the name of the brand");

    if (!name) {
      throw new Error("Brand name is required");
      // also can reinforce the user to enter the name again and again.
    }

    const brand = await addBrand(name);
    const brands = await fetchAllBrands();
    setBrands(brands);
    return brand;
  };

  const onBrandDelete = async (brandId: number) => {
    await deleteBrand(brandId);
    const brands = await fetchAllBrands();
    const products = await fetchAllProducts();
    setBrands(brands);
    setProducts(products);
  };

  return (
    <div className="mx-8 my-4 md:mx-auto md:w-[702px]">
      <h2 className="text-lg text-red-500 border-b-2 pb-2 w-fit">
        Manage product of different brands
      </h2>
      <ProductsForm
        onProductCreate={onProductCreate}
        onBrandCreate={onBrandCreate}
        brands={brands}
      />
      <input
        placeholder="Search for Products ..."
        className="px-2 py-1 border border-black rounded-md mt-8"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <div className="overflow-x-auto">
        <ProductsTable
          brands={brands}
          products={filteredProducts}
          onBrandDelete={onBrandDelete}
          onProductDelete={onProductDelete}
          onProductEdit={onProductEdit}
        />
      </div>
    </div>
  );
}

export default App;
