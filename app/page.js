import Products from "./products/page";

export default async function Home() {
  
  const getProducts = async () => {
    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();
    return data;
  }

  const products = await getProducts();
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-5">
        <Products products={products} />
      </main>
    </>
  );
}
