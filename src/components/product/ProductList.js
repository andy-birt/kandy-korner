import React, { useContext, useEffect } from "react";
import { ProductContext } from "./ProductProvider";
import { ProductCard } from "./ProductCard";
import "./Product.css";
import { ProductTypeContext } from "../productType/ProductTypeProvider";

export const ProductList = () => {
  // This state changes when `getProducts()` is invoked below
  const { products, getProducts } = useContext(ProductContext);
  const { productTypes, getProductTypes } = useContext(ProductTypeContext);

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("ProductList: useEffect - getProducts")
    getProductTypes().then(getProducts);

  }, []);


  return (
    <div className="products">
      {console.log("ProductList: Render", products)}
      {
        products.map(product => {
          const productType = productTypes.find(pt => pt.id === product.productTypeId);
          return <ProductCard key={product.id} product={product} productType={productType} />
        })
      }
    </div>
  );
}