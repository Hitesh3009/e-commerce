import { promises as fs } from 'fs';

export async function POST(req) {
    try {
        const newProducts = await req.json(); // The new product data (an array of objects)
        const filePath = 'cartproducts/products.json';
        
        // Read the existing file content
        let existingProducts = [];

        try {
            const fileContents = await fs.readFile(filePath, 'utf-8');
            existingProducts = JSON.parse(fileContents);
        } catch (readError) {
            console.error('Error reading file or file does not exist, starting with an empty array', readError.message);
        }

        // Merge arrays and remove duplicates
        const mergedProducts = [
            ...existingProducts,
            ...newProducts.filter(newProduct => !existingProducts.some(existingProduct => existingProduct.id === newProduct.id))
        ];

        // Write the updated array back to the file
        await fs.writeFile(filePath, JSON.stringify(mergedProducts, null, 4), 'utf-8');

        // Return the success message after successfully writing the JSON file
        return new Response(JSON.stringify({ message: 'Product data added successfully.' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (e) {
        console.error('Error processing the request:', e.message); // Handle any errors during processing

        // Display the error message as JSON response
        return new Response(JSON.stringify({ error: 'Failed to add the cart products data' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        });
    }
}
