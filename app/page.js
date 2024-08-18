import { Suspense } from "react";
import Products from "./products/page";
import {promises as fs} from 'fs';
import Loading from "./loading";
export default async function Home() {
  
  // fetches the details of available product from the api
  const getProducts = async () => {
    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();
    return data;
  }

  const products = await getProducts(); // gets the data returned from the getProducts function
  const jsonData =await fs.readFile('cartproducts/products.json','utf-8'); // reads the json data
  const products_in_cart=JSON.parse(jsonData); // converts the json data to object
  // checks whether the product is already in the cart and hence does not display it on the main page
  const filteredProducts = products.filter(product => !products_in_cart.some(cartItem => cartItem.id === product.id));

  return (
    <>
    <Suspense fallback={<Loading/>}> {/* used to access the loader until data is available */}
      <main className="flex min-h-screen flex-col items-center p-5">
        <Products products={filteredProducts} /> {/* passes the product data to to product components as props */}
      </main>
    </Suspense>
    </>
  );
}
