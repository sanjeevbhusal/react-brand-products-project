import { Brand } from "./api/brands";
import { Product } from "./api/products";

type BrandIdToProductsMap = {
  [brandId: number]: Product[];
};

type ProductInSingleRow = Product[];
type ProductsInEntireTable = ProductInSingleRow[];

export function getProductsForEntireTable(
  highestProductCount: number,
  brands: Brand[],
  brandIdToProductMapping: BrandIdToProductsMap
) {
  const productsInEntireTable: ProductsInEntireTable = [];

  for (let i = 0; i < highestProductCount; i++) {
    const productsInSingleRow: ProductInSingleRow = [];

    brands.forEach((brand) => {
      const product = brandIdToProductMapping[brand.id][i];
      productsInSingleRow.push(product);
    });

    productsInEntireTable.push(productsInSingleRow);
  }

  return productsInEntireTable;
}

export function getHighestProductCountInBrandMap(
  brandIdToProductMapping: BrandIdToProductsMap
) {
  return Math.max(
    ...Object.values(brandIdToProductMapping).map((data) => data.length)
  );
}

export function getBrandIdToProductsMapping(
  brands: Brand[],
  products: Product[]
): BrandIdToProductsMap {
  const brandIdToProductMapping: BrandIdToProductsMap = {};

  brands.forEach((brand) => {
    brandIdToProductMapping[brand.id] = [];
  });

  products.forEach((product) => {
    brandIdToProductMapping[product.brandId].push(product);
  });

  sortProductsByName(brandIdToProductMapping);
  return brandIdToProductMapping;
}

function sortProductsByName(brandIdToProductMapping: BrandIdToProductsMap) {
  Object.values(brandIdToProductMapping).forEach((products) => {
    products.sort((a, b) => a.name.localeCompare(b.name));
  });
}

export function getRandomKey() {
  return 10000 * Math.random();
}
