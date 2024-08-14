export async function GET(){
    try{
        // Fetching the products data from the external api
        const res=await fetch(`https://fakestoreapi.com/products`);

        // Checks whether the response is ok while fetching the products else throws an custom error
        if(!res.ok){
            throw new Error('Some error occurred while fetching the products',res.statusText);
        }
        const productArr=await res.json();
       
        // if everything is ok then returns the response in json format with status code 200
        return new Response(JSON.stringify(productArr),{
            headers:{'Content-Type': 'application/json'},
            status: 200,
        })
    }catch(e){
        console.error(e.message); // Logs the error message

        // Returns the response to the user if any error occurs
        return new Response(JSON.stringify({error:'Failed to fetch products, please try again later.'}),{
            headers:{'Content-Type': 'application/json'},
            status: 500,
        })
    }
}