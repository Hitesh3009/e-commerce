import { promises as fs } from 'fs';
export async function DELETE(req, { params }) {
    try {
        const { products } = await req.json(); // gets the products data from the body
        const { id } = params; // gets the id of the product

        const prodIndex = products.findIndex(product => product.id === Number(id)); // gets the index of the product where id is matched

        // if index is not found return product not found
        if (prodIndex === -1) {
            return new Response(JSON.stringify({ message: 'Product not found' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 404
            });
        }

        else {
            // remove product from the index and remove count is 1
            products.splice(prodIndex, 1);

            // updates the json file with the remaining products by removing the product which is removed by the user
            await fs.writeFile('cartproducts/products.json', JSON.stringify(products, null, 4), 'utf-8');

            // success message as json
            return new Response(JSON.stringify({ message: 'Product successfully deleted' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 200
            });
        }
    } catch (e) {
        console.error(e.message); // logs the error message

        // error message as json
        return new Response(JSON.stringify({ error: 'Error removing the product' }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 500
            });
    }
}