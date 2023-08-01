import { Brand } from "./api/brands";
import { Product } from "./api/products";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import {
  getBrandIdToProductsMapping,
  getHighestProductCountInBrandMap,
  getProductsForEntireTable,
  getRandomKey,
} from "./utils";

interface ProductsTableProps {
  products: Product[];
  brands: Brand[];
  onBrandDelete: (brandId: number) => void;
  onProductDelete: (productId: number) => void;
  onProductEdit: (produtcId: number) => void;
}

export default function ProductsTable({
  products,
  brands,
  onBrandDelete,
  onProductDelete,
  onProductEdit,
}: ProductsTableProps) {
  const brandIdToProductMapping = getBrandIdToProductsMapping(brands, products);
  const highestProductCount = getHighestProductCountInBrandMap(
    brandIdToProductMapping
  );
  const productsForEntireTable = getProductsForEntireTable(
    highestProductCount,
    brands,
    brandIdToProductMapping
  );

  return (
    <table className="table-fixed border-2 border-black mt-8 w-full">
      <tbody>
        <tr className="border-b-2 border-black">
          {brands.map((brand) => {
            return (
              <th key={brand.id} className="border-r-2 border-black py-2 w-64">
                {brand.name}
                <MdDeleteOutline
                  className="inline ml-4 cursor-pointer"
                  onClick={() => onBrandDelete(brand.id)}
                />
              </th>
            );
          })}
        </tr>
        {productsForEntireTable.map((productsForSingleRow) => {
          const rowKey = productsForSingleRow.find(
            (product) => product !== undefined
          )?.id;

          return (
            <tr className="border-b-2 border-black py-2" key={rowKey}>
              {productsForSingleRow.map((product) => {
                return (
                  <td
                    key={product?.id || getRandomKey()}
                    className="border-r-2 border-black py-2"
                  >
                    {product && (
                      <div className="flex items-center justify-center">
                        <p className="w-1/2">{product.name}</p>
                        <div className="ml-4">
                          <MdDeleteOutline
                            className="inline cursor-pointer text-xl"
                            onClick={() => onProductDelete(product.id)}
                          />
                          <MdEdit
                            className="inline cursor-pointer ml-2 text-xl"
                            onClick={() => onProductEdit(product.id)}
                          />
                        </div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
