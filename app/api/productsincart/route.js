import { promises as fs } from 'fs';
export async function GET() {
    try {
        const res = await fs.readFile('cartproducts/products.json', 'utf-8'); //reads the json file which includes all the products added to the cart

        // Sends the response to access the products details
        return new Response(res, {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (e) {
        console.error(e.message); // logs the error message

        // Displays the error message as json 
        return new Response(JSON.stringify({ error: 'Internal Server error' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
}