import { Suspense } from "react";
import Products from "./products/page";
import {promises as fs} from 'fs';
import Loading from "./loading";
export default async function Home() {
  
  const getProducts = async () => {
    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();
    return data;
  }

  const products = await getProducts();
  const jsonData =await fs.readFile('cartproducts/products.json','utf-8');
  const products_in_cart=JSON.parse(jsonData);
  const filteredProducts = products.filter(product => !products_in_cart.some(cartItem => cartItem.id === product.id));

  return (
    <>
    <Suspense fallback={<Loading/>}>
      <main className="flex min-h-screen flex-col items-center p-5">
        <Products products={filteredProducts} />
      </main>
    </Suspense>
    </>
  );
}
